// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const db = getFirestore(app);
// const analytics = getAnalytics(app); 