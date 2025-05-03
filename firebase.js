// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth';
import   AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtJFhzoR-_sS4oDzD78XGxrjHCU0uE-fY",
  authDomain: "languageapp-89fde.firebaseapp.com",
  projectId: "languageapp-89fde",
  storageBucket: "languageapp-89fde.appspot.com",
  messagingSenderId: "982346984981",
  appId: "1:982346984981:web:d76c7df8408a95a2f5a81c",
  measurementId: "G-366METLZM8"
};
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase authenticaAtion with React Native persistence
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase Storage
const storage = getStorage(firebaseApp);

const firestore = getFirestore(firebaseApp); // Initialize Firestore

export { auth, storage, firestore };