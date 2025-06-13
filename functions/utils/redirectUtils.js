const admin = require('firebase-admin');
const db = admin.firestore();

const redirectToOriginal = async (req, res) => {
  const { key } = req.params;
  try {
    console.log("Fetching URL for key:", key);
    const urlDoc = await db.collection("urls").doc(key).get();
    if (!urlDoc.exists) {
      return res.status(404).json({ error: "URL not found" });
    }
    const { original_url, expiration_date, access_count } = urlDoc.data();
    const expirationDate = expiration_date.toDate(); // Convert Timestamp to Date
    const now = new Date();
    console.log("Current time:", now.toISOString());
    console.log("Expiration date:", expirationDate.toISOString());
    if (expirationDate < now) {
      return res.status(410).json({ error: "URL expired" });
    }
    await db.collection("urls").doc(key).update({ access_count: access_count + 1 });
    res.redirect(original_url);
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { redirectToOriginal };