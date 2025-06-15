const admin = require('firebase-admin');
// console.log("Admin module in shortenUtils:", admin);
// console.log("Firestore namespace:", admin.firestore);
// console.log("Timestamp property:", admin.firestore ? admin.firestore.Timestamp : "Undefined");
const db = admin.firestore();

const shortenUrl = async (req, res) => {
  const { url } = req.body;
  if (!url || !/^https?:\/\//.test(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    // console.log("Querying available keys...");
    const keyDoc = await db.collection("keys").where("status", "==", "available").limit(1).get();
    // console.log("Query result size:", keyDoc.size);
    if (keyDoc.empty) {
      return res.status(500).json({ error: "No available keys" });
    }

    const key = keyDoc.docs[0].data().key;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set expiration to 7 days from now

    await db.collection("urls").doc(key).set({
      key,
      original_url: url,
      expiration_date: expirationDate, // Use plain Date object
      access_count: 0,
    });

    await db.collection("keys").doc(key).update({ status: "used" });

    const shortUrl = `http://localhost:5000/${key}`;
    res.json({ shortUrl });
  } catch (error) {
    console.error("Shorten URL error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { shortenUrl };