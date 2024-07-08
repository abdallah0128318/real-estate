// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-abdallah2024.firebaseapp.com",
  projectId: "real-estate-abdallah2024",
  storageBucket: "real-estate-abdallah2024.appspot.com",
  messagingSenderId: "606673612384",
  appId: "1:606673612384:web:1543be2b2cc61f8fa65d05",
  measurementId: "G-FXG9WLLDS2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
