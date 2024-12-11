// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDCD5ygmYCHDgWDAoslzOoixsWG9VBUTw8",
    authDomain: "cambridge-aquaculture-waitlist.firebaseapp.com",
    projectId: "cambridge-aquaculture-waitlist",
    storageBucket: "cambridge-aquaculture-waitlist.firebasestorage.app",
    messagingSenderId: "763809336517",
    appId: "1:763809336517:web:7db9d59a39f6c04389b4ac",
    measurementId: "G-5WCK3Y1WTL"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
