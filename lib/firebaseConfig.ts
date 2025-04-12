// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
export default app;
