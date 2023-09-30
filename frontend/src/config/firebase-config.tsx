// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQUsBho8hyJU_oFeuY1Xgix4DLPtLEnbk",
  authDomain: "ticket-sales-app.firebaseapp.com",
  projectId: "ticket-sales-app",
  storageBucket: "ticket-sales-app.appspot.com",
  messagingSenderId: "557356314378",
  appId: "1:557356314378:web:5617af0d27961cf65894f3",
  measurementId: "G-W96WTYCVQN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
