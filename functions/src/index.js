const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const express = require("express");
const logger = require("firebase-functions/logger");

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const app = express();

app.use(express.json());

app.use(require("../routes/shorten"));
app.use(require("../routes/redirect"));
app.use(require("../routes/cleanup"));

exports.generateKeys = onRequest(async (req, res) => {
  try {
    logger.info("Generating keys...", { structuredData: true });
    await require("../utils/kgs").generateKeys(10000);
    res.json({ message: "Keys generated successfully" });
  } catch (error) {
    logger.error("Failed to generate keys", { error });
    res.status(500).json({ error: "Failed to generate keys" });
  }
});

exports.app = onRequest(app);