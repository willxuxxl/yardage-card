<<<<<<< HEAD
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDUnTIbSG8J5bafhk6eGjZeHSmhT3NDp3g",
  authDomain: "yardage-card-285d7.firebaseapp.com",
  databaseURL: "https://yardage-card-285d7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yardage-card-285d7",
  storageBucket: "yardage-card-285d7.firebasestorage.app",
  messagingSenderId: "673294628796",
  appId: "1:673294628796:web:5f0ee5add6148452365db9",
  measurementId: "G-D7RS38550P"
=======
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
>>>>>>> 2e29799594c271cea7e9e671c318e46ad15b9f12
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
<<<<<<< HEAD
export const analytics = getAnalytics(app); 
=======
>>>>>>> 2e29799594c271cea7e9e671c318e46ad15b9f12
