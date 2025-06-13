const admin = require('firebase-admin');
const db = admin.firestore();

const cleanupExpiredUrls = async (req, res) => {
  try {
    const now = new Date();
    const urlsSnapshot = await db.collection("urls").where("expiration_date", "<", now).get(); // Compare Date objects
    const batch = db.batch();
    urlsSnapshot.forEach((doc) => {
      batch.delete(db.collection("urls").doc(doc.id));
      batch.update(db.collection("keys").doc(doc.id), { status: "available" });
    });
    await batch.commit();
    res.json({ message: `Deleted ${urlsSnapshot.size} expired URLs` });
  } catch (error) {
    console.error("Cleanup error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { cleanupExpiredUrls };