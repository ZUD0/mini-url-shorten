const { onRequest } = require("firebase-functions/v2/https"); // Import onRequest from Firebase Functions v2 for HTTP request handling
const admin = require("firebase-admin"); // Import Firebase Admin SDK to interact with Firebase services (e.g., Firestore)
const express = require("express"); // Import Express framework for building REST APIs
const logger = require("firebase-functions/logger"); // Import Firebase logger for logging function execution details

if (!admin.apps.length) { // Check if Firebase Admin app is not initialized
  admin.initializeApp(); // Initialize Firebase Admin SDK with default credentials
}

const db = admin.firestore(); // Create Firestore instance for database operations
const app = express(); // Create Express app instance for routing and middleware

app.use(express.json()); // Add middleware to parse incoming JSON request bodies

app.use(require("../routes/shorten")); // Mount shorten route (POST /api/shorten) from shorten.js
app.use(require("../routes/redirect")); // Mount redirect route (GET /:key) from redirect.js
app.use(require("../routes/cleanup")); // Mount cleanup route (GET /api/cleanup) from cleanup.js

exports.generateKeys = onRequest(async (req, res) => { // Define HTTP Cloud Function for generating keys
  try { // Start try block to handle errors
    logger.info("Generating keys...", { structuredData: true }); // Log info message for key generation start
    await require("../utils/kgs").generateKeys(10000); // Call generateKeys function from kgs.js to create 10,000 keys
    res.json({ message: "Keys generated successfully" }); // Send success response as JSON
  } catch (error) { // Catch any errors during execution
    logger.error("Failed to generate keys", { error }); // Log error details
    res.status(500).json({ error: "Failed to generate keys" }); // Send 500 error response as JSON
  }
});

exports.app = onRequest(app); // Export Express app as a Cloud Function to handle all routes defined in app