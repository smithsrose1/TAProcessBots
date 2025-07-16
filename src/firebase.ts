// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx3bwpd_oKckg6K4yfFL1Zqdfces5A0Lk",
  authDomain: "ta-process-bots.firebaseapp.com",
  projectId: "ta-process-bots",
  storageBucket: "ta-process-bots.firebasestorage.app",
  messagingSenderId: "321428524418",
  appId: "1:321428524418:web:c4cf4d27cbf09952c2939b",
  measurementId: "G-4G3JHK1C7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };