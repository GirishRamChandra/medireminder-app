// src/firebase/auth.js
// ─────────────────────────────────────────────────────────────
// Auth functions for both patients and doctors.
// All functions return { success, user/error } so the frontend
// can handle results uniformly without try/catch everywhere.
// ─────────────────────────────────────────────────────────────

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./config";
import { saveUserProfile } from "./userService";

// ── PATIENT SIGNUP ────────────────────────────────────────────
export const patientSignup = async ({ name, email, phone, password }) => {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    // Persist the profile to Firestore so other parts of the app can read it
    await saveUserProfile({
      userID:    user.uid,
      name,
      email,
      phone,
      role:      "patient",
    });

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── PATIENT LOGIN ─────────────────────────────────────────────
export const patientLogin = async ({ email, password }) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: credential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── DOCTOR SIGNUP ─────────────────────────────────────────────
export const doctorSignup = async ({ name, email, phone, password }) => {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    await saveUserProfile({
      userID:    user.uid,
      name,
      email,
      phone,
      role:      "doctor",
    });

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── DOCTOR LOGIN ──────────────────────────────────────────────
export const doctorLogin = async ({ email, password }) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: credential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── SIGN OUT (shared) ─────────────────────────────────────────
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── AUTH STATE LISTENER ───────────────────────────────────────
// Usage in a component: const unsub = onAuthChange(setCurrentUser);
// Call unsub() in useEffect cleanup.
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);
