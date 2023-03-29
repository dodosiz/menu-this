// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_API_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// change this to activate emulation
const dev = process.env.NEXT_DEV || false;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = dev ? getAuth() : getAuth(app);
if (dev) {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export const provider = new GoogleAuthProvider();

// DEV
export const db = dev ? getFirestore() : getFirestore(app);
if (dev && !(db as any)._settingsFrozen) {
  connectFirestoreEmulator(db, "localhost", 8080);
}
