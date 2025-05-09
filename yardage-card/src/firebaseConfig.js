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
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app); 