// src/firebase/doctorService.js
// ─────────────────────────────────────────────────────────────
// Doctor-specific Firestore operations.
//
// Extra collection used here:
//
//   doctorPatients/{doctorID}/patients/{patientID}
//     – addedAt  : server timestamp
//     – patientID: string  (mirrors the sub-doc ID)
//
// This subcollection approach scales better than an array field
// and lets you query each doctor's patient list independently.
// ─────────────────────────────────────────────────────────────

import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "./config";
import { addMedicine } from "./medicineService";
import { getUserProfile } from "./userService";

// ── ADD A PATIENT TO DOCTOR'S LIST ────────────────────────────
// Registers the doctor–patient relationship.
// Call this when a doctor first links to a patient account.
export const addPatientToDoctor = async (doctorID, patientID) => {
  try {
    const patientRef = doc(db, "doctorPatients", doctorID, "patients", patientID);
    await setDoc(patientRef, {
      patientID,
      addedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── FETCH ALL PATIENTS FOR A DOCTOR ──────────────────────────
// Returns an array of patient profile objects (from `users` collection).
export const getDoctorPatients = async (doctorID) => {
  try {
    const patientsSnap = await getDocs(
      collection(db, "doctorPatients", doctorID, "patients")
    );

    if (patientsSnap.empty) return { success: true, data: [] };

    // Fetch each patient's full profile in parallel
    const profilePromises = patientsSnap.docs.map((d) =>
      getUserProfile(d.data().patientID)
    );
    const results = await Promise.all(profilePromises);

    const patients = results
      .filter((r) => r.success)
      .map((r) => r.data);

    return { success: true, data: patients };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── SAVE A PRESCRIPTION (multiple medicines at once) ──────────
// medicines: array of medicine objects (same shape as addMedicine params,
//            minus patientID and addedBy — those are injected here).
//
// Example call:
//   savePrescription("doc123", "patient456", [
//     { medicineName: "Metformin", dosage: "500mg", frequency: "twice daily",
//       timeOfDay: ["morning", "evening"], foodRequirement: "after food" },
//     { medicineName: "Aspirin",   dosage: "75mg",  frequency: "once daily",
//       timeOfDay: ["morning"],            foodRequirement: "after food" },
//   ])
export const savePrescription = async (doctorID, patientID, medicines) => {
  try {
    if (!Array.isArray(medicines) || medicines.length === 0) {
      return { success: false, error: "No medicines provided" };
    }

    const addResults = await Promise.all(
      medicines.map((med) =>
        addMedicine({ ...med, patientID, addedBy: doctorID })
      )
    );

    const failed = addResults.filter((r) => !r.success);
    if (failed.length > 0) {
      return {
        success: false,
        error: `${failed.length} medicine(s) failed to save`,
        details: failed,
      };
    }

    return {
      success:     true,
      savedCount:  addResults.length,
      medicineIDs: addResults.map((r) => r.medicineID),
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── CHECK IF PATIENT BELONGS TO DOCTOR ───────────────────────
// Useful for auth-guarding doctor actions on patient data.
export const isDoctorPatient = async (doctorID, patientID) => {
  try {
    const snap = await getDoc(
      doc(db, "doctorPatients", doctorID, "patients", patientID)
    );
    return { success: true, exists: snap.exists() };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
