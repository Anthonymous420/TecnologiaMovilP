// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYaQaofctA9GHiItrcw4hJ60WmrDey6TA",
  authDomain: "tm2024-1-d4aa4.firebaseapp.com",
  projectId: "tm2024-1-d4aa4",
  storageBucket: "tm2024-1-d4aa4.appspot.com",
  messagingSenderId: "72786569244",
  appId: "1:72786569244:web:031179fcd21efce66417d9"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(appFirebase);

export { appFirebase, auth, db };
