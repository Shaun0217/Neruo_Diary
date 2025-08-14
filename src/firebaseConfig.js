// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your Firebase config (from step 1)
const firebaseConfig = {
  apiKey: "AIzaSyANp00pH5YCJh0D2Rd_MA2JKJHIthRlAoY",
  authDomain: "neuro-diary-blog.firebaseapp.com",
  projectId: "neuro-diary-blog",
  storageBucket: "neuro-diary-blog.firebasestorage.app",
  messagingSenderId: "720975355720",
  appId: "1:720975355720:web:600c1182a641503420dd7d",
  
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);