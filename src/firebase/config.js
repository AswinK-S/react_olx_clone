import { initializeApp } from 'firebase/app';
import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";
import * as storage from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCeMUJNHGEsWddGQ_GvgemOslfA1ShiIT0",
  authDomain: "olx-clone-97a06.firebaseapp.com",
  projectId: "olx-clone-97a06",
  storageBucket: "olx-clone-97a06.appspot.com",
  messagingSenderId: "380131168636",
  appId: "1:380131168636:web:3ad5df66a55c60279ad4f9",
  measurementId: "G-2NHBNFW0Z5"
};

const app = initializeApp(firebaseConfig);
const db = firestore.getFirestore();

const firebaseExports = { app, db, firebaseAuth, firestore, storage };
export default firebaseExports;