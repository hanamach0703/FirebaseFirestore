// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 
// import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmMAT3U5-MYq46nk2jZ3q-bsXlJu3YpwU",
  authDomain: "odp-309-47489.firebaseapp.com",
  projectId: "odp-309-47489",
  storageBucket: "odp-309-47489.appspot.com",
  messagingSenderId: "378116019600",
  appId: "1:378116019600:web:f563d9a5d9d4e9d9ac0f15",
  measurementId: "G-3CDFMB8QGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, collection, addDoc, db, onSnapshot, deleteDoc, doc }