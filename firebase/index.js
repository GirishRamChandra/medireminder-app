// src/firebase/index.js
// ─────────────────────────────────────────────────────────────
// Single entry point — import everything from here in your components.
//
//   import { patientSignup, addMedicine, getDoctorPatients } from "../firebase";
// ─────────────────────────────────────────────────────────────

export { auth, db }                         from "./config";
export { patientSignup, patientLogin,
         doctorSignup,  doctorLogin,
         logout, onAuthChange }             from "./auth";
export { saveUserProfile, getUserProfile,
         updateUserProfile }               from "./userService";
export { addMedicine, getMedicinesForPatient,
         getMedicineByID, updateMedicine,
         deleteMedicine, logReminderSent } from "./medicineService";
export { addPatientToDoctor, getDoctorPatients,
         savePrescription, isDoctorPatient } from "./doctorService";
