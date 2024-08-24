// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBskAah-lAxXHxdP-vRuh-rwhtSzz9P0rU",
  authDomain: "esut-drivers-f8fa3.firebaseapp.com",
  projectId: "esut-drivers-f8fa3",
  storageBucket: "esut-drivers-f8fa3.appspot.com",
  messagingSenderId: "179018839022",
  appId: "1:179018839022:web:6edb1fe24a9a22941c94ff",
  measurementId: "G-5W39RZKYY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
export {auth, firestore}