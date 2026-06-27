// src/firebase/medicineService.js
// ─────────────────────────────────────────────────────────────
// CRUD operations for the `medicines` collection.
//
// Collection: medicines
// Document ID: auto-generated (stored inside doc as medicineID)
// Fields:
//   medicineID       – string  (mirrors the doc ID)
//   patientID        – string  (UID of the patient this belongs to)
//   medicineName     – string  e.g. "Metformin 500mg"
//   dosage           – string  e.g. "1 tablet"
//   frequency        – "once daily" | "twice daily" | "thrice daily"
//   timeOfDay        – string[] e.g. ["morning", "evening"]
//                      allowed values: "morning" | "afternoon" | "evening" | "night"
//   foodRequirement  – "before food" | "after food" | "anytime"
//   addedBy          – string  (doctorID if prescribed, patientID if self-added)
//   createdAt        – Firestore server timestamp
//   remindersSent    – Firestore timestamp[]  (starts empty; updated by reminder logic)
// ─────────────────────────────────────────────────────────────

import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const MEDICINES_COL = "medicines";

// ── ADD A NEW MEDICINE ────────────────────────────────────────
export const addMedicine = async ({
  patientID,
  medicineName,
  dosage,
  frequency,
  timeOfDay,
  foodRequirement,
  addedBy,
}) => {
  try {
    const docRef = await addDoc(collection(db, MEDICINES_COL), {
      patientID,
      medicineName,
      dosage,
      frequency,
      timeOfDay,       // array, e.g. ["morning", "night"]
      foodRequirement,
      addedBy,
      createdAt:      serverTimestamp(),
      remindersSent:  [],
    });

    // Write back the auto-generated ID into the document itself
    await updateDoc(docRef, { medicineID: docRef.id });

    return { success: true, medicineID: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── FETCH ALL MEDICINES FOR A PATIENT ─────────────────────────
export const getMedicinesForPatient = async (patientID) => {
  try {
    const q    = query(collection(db, MEDICINES_COL), where("patientID", "==", patientID));
    const snap = await getDocs(q);
    const medicines = snap.docs.map((d) => d.data());
    return { success: true, data: medicines };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── FETCH A SINGLE MEDICINE ───────────────────────────────────
export const getMedicineByID = async (medicineID) => {
  try {
    const snap = await getDoc(doc(db, MEDICINES_COL, medicineID));
    if (!snap.exists()) return { success: false, error: "Medicine not found" };
    return { success: true, data: snap.data() };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── UPDATE A MEDICINE ─────────────────────────────────────────
// Pass only the fields you want to change.
export const updateMedicine = async (medicineID, updates) => {
  try {
    await updateDoc(doc(db, MEDICINES_COL, medicineID), updates);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── DELETE A MEDICINE ─────────────────────────────────────────
export const deleteMedicine = async (medicineID) => {
  try {
    await deleteDoc(doc(db, MEDICINES_COL, medicineID));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── LOG A REMINDER SENT (append timestamp) ────────────────────
// Called by your reminder scheduler each time a notification fires.
export const logReminderSent = async (medicineID, timestamp = new Date()) => {
  try {
    await updateDoc(doc(db, MEDICINES_COL, medicineID), {
      remindersSent: arrayUnion(timestamp),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
