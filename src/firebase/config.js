// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtLChzWT_PfiwQOeWB1cZRO7KVbCgSvc8",
  authDomain: "as2---desenvolvimento-web.firebaseapp.com",
  projectId: "as2---desenvolvimento-web",
  storageBucket: "as2---desenvolvimento-web.firebasestorage.app",
  messagingSenderId: "876489986663",
  appId: "1:876489986663:web:7b8086de985ac4cd03bac2",
  measurementId: "G-JKBWGVTMT3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
