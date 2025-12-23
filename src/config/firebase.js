// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYeh9ZXeJdi_Tg-GIzdKbXfEUbEwBd29g",
  authDomain: "towers-18a6a.firebaseapp.com",
  projectId: "towers-18a6a",
  storageBucket: "towers-18a6a.firebasestorage.app",
  messagingSenderId: "871174058534",
  appId: "1:871174058534:web:8cfd2d849b368d7f8e6ce7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
export {auth, db}