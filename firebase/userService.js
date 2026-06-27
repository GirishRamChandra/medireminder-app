// src/firebase/userService.js
// ─────────────────────────────────────────────────────────────
// Firestore operations for the `users` collection.
//
// Collection: users
// Document ID: userID (same as Firebase Auth UID)
// Fields:
//   userID    – string  (mirrors the doc ID for convenience)
//   name      – string
//   email     – string
//   phone     – string
//   role      – "patient" | "doctor"
//   createdAt – Firestore server timestamp
// ─────────────────────────────────────────────────────────────

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

// ── SAVE (create or overwrite) USER PROFILE ───────────────────
export const saveUserProfile = async ({ userID, name, email, phone, role }) => {
  try {
    await setDoc(doc(db, "users", userID), {
      userID,
      name,
      email,
      phone,
      role,
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── GET USER PROFILE ──────────────────────────────────────────
export const getUserProfile = async (userID) => {
  try {
    const snap = await getDoc(doc(db, "users", userID));
    if (!snap.exists()) return { success: false, error: "User not found" };
    return { success: true, data: snap.data() };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── UPDATE USER PROFILE ───────────────────────────────────────
// Only pass the fields you want to change; others are untouched.
export const updateUserProfile = async (userID, updates) => {
  try {
    await updateDoc(doc(db, "users", userID), updates);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
