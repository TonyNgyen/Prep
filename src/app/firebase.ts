// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

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
let analytics: Analytics | undefined;
let db: Firestore;
let auth: Auth;
let app: FirebaseApp;

if (firebaseConfig?.projectId) {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);

  // Initialize Analytics only if in the browser environment
  if (app.name && typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }

  // Access Firebase services using shorthand notation
  db = getFirestore(app);
  auth = getAuth(app);
}

export { app, analytics, db, auth };
