// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpQDdXA17_sA3jj3hvXWTZVT6m1vAtH5s",
  authDomain: "towers-11d78.firebaseapp.com",
  projectId: "towers-11d78",
  storageBucket: "towers-11d78.firebasestorage.app",
  messagingSenderId: "387193754334",
  appId: "1:387193754334:web:7405a0065942978739684f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
export {auth, db}