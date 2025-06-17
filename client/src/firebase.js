import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication
import { getFirestore } from "firebase/firestore"; // Import getFirestore for database

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiGOs-KFp0Z3lKz8-k3XebTU4SoqWhVmo",
  authDomain: "mini-url-shorten.firebaseapp.com",
  projectId: "mini-url-shorten",
  storageBucket: "mini-url-shorten.firebasestorage.app",
  messagingSenderId: "633120166328",
  appId: "1:633120166328:web:b6a7f1fe1ec298ad313f4d",
  measurementId: "G-K12ZQDWC8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); // Initialize auth
export const db = getFirestore(app); // Initialize Firestore