// src/firebase/config.js
// ─────────────────────────────────────────────────────────────
// Replace every value below with your real Firebase project credentials.
// Find them at: Firebase Console → Project Settings → Your Apps → SDK Setup
// ─────────────────────────────────────────────────────────────

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyDRcb2APeXe-cwehFp6f9HDhttTp8VA92I",
authDomain: "medi-remind-66ee6.firebaseapp.com",
projectId: "medi-remind-66ee6",
storageBucket: "medi-remind-66ee6.firebasestorage.app",
messagingSenderId: "542638283118",
appId: "1:542638283118:web:64ee1dffcbdc39b8d5c97f"
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
export default app;
