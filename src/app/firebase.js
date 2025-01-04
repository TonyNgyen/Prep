// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-5dUAxlxSxnMWiqQ28O2ivgM_2AdWk-8",
  authDomain: "prep-df000.firebaseapp.com",
  projectId: "prep-df000",
  storageBucket: "prep-df000.firebasestorage.app",
  messagingSenderId: "605576166315",
  appId: "1:605576166315:web:d9fb8a23d3cf7b1a6070ee",
  measurementId: "G-D053J54DGN",
};

// Initialize Firebase

let analytics;
/** @type {import('firebase/firestore').Firestore} */
let db;
/** @type {import('firebase/auth').Auth} */
let auth;
let app;
if (firebaseConfig?.projectId) {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }

  // Access Firebase services using shorthand notation
  db = getFirestore(app);
  auth = getAuth(app);
}

export { app, analytics, db, auth };
