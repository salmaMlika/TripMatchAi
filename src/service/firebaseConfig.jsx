// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA40HuExRcTDDq9BboVi0usJ78sadMj-U0",
  authDomain: "tripmatch-fe17e.firebaseapp.com",
  projectId: "tripmatch-fe17e",
  storageBucket: "tripmatch-fe17e.firebasestorage.app",
  messagingSenderId: "167516534981",
  appId: "1:167516534981:web:3dffcb84667a51c35598ac",
  measurementId: "G-VM0BD8BRQX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
const analytics = getAnalytics(app);