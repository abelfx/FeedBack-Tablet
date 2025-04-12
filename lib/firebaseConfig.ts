// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6tTJFX5CYwYOW1WXURLY2JX9nbHahSG8",
  authDomain: "feedbackk-1d21d.firebaseapp.com",
  projectId: "feedbackk-1d21d",
  storageBucket: "feedbackk-1d21d.firebasestorage.app",
  messagingSenderId: "55628190853",
  appId: "1:55628190853:web:b5acbd0c5cd920f76e85ec",
  measurementId: "G-B31TD4LJ35",
};

let app: FirebaseApp;
let db: Firestore;

export function useFirebase() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !app) {
      app =
        getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      db = getFirestore(app);
      setIsInitialized(true);
    }
  }, []);

  return { app, db, isInitialized };
}

export { db };
export default app;
