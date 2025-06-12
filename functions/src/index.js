const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");`    `
const { generateKeys } = require("../utils/kgs");
// functions\utils\kgs.js
admin.initializeApp();
const db = admin.firestore();
const app = express();

app.use(express.json());

// POST /api/shorten: Generate a short URL
app.post("/api/shorten", async (req, res) => {
  const { url } = req.body;
  if (!url || !/^https?:\/\//.test(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    // Find an available key
    const keyDoc = await db
      .collection("keys")
      .where("status", "==", "available")
      .limit(1)
      .get();

    if (keyDoc.empty) {
      return res.status(500).json({ error: "No available keys" });
    }

    const key = keyDoc.docs[0].data().key;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    // Store URL mapping
    await db.collection("urls").doc(key).set({
      key,
      original_url: url,
      expiration_date: admin.firestore.Timestamp.fromDate(expirationDate),
      access_count: 0,
    });

    // Mark key as used
    await db.collection("keys").doc(key).update({ status: "used" });

    const shortUrl = `https://${functions.config().firebase.hosting.domain}/${key}`;
    res.json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /:key: Redirect to original URL
app.get("/:key", async (req, res) => {
  const { key } = req.params;

  try {
    const urlDoc = await db.collection("urls").doc(key).get();
    if (!urlDoc.exists) {
      return res.status(404).json({ error: "URL not found" });
    }

    const { original_url, expiration_date, access_count } = urlDoc.data();
    if (expiration_date.toDate() < new Date()) {
      return res.status(410).json({ error: "URL expired" });
    }

    // Increment access count
    await db.collection("urls").doc(key).update({
      access_count: access_count + 1,
    });

    res.redirect(original_url);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/cleanup: Delete expired URLs (for testing; later use scheduled function)
app.get("/api/cleanup", async (req, res) => {
  try {
    const now = new Date();
    const urlsSnapshot = await db
      .collection("urls")
      .where("expiration_date", "<", admin.firestore.Timestamp.fromDate(now))
      .get();

    const batch = db.batch();
    urlsSnapshot.forEach((doc) => {
      batch.delete(db.collection("urls").doc(doc.id));
      batch.update(db.collection("keys").doc(doc.id), { status: "available" });
    });

    await batch.commit();
    res.json({ message: `Deleted ${urlsSnapshot.size} expired URLs` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



// Add before exports.app
exports.generateKeys = functions.https.onRequest(async (req, res) => {
  try {
    await generateKeys(10000);
    res.json({ message: "Keys generated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate keys" });
  }
});

exports.app = functions.https.onRequest(app);