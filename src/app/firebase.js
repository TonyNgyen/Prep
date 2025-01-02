// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  measurementId: "G-D053J54DGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);