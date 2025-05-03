// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth';
import   AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  
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
