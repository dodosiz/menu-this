// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkId_yr37X52Wcy9X-k9q6YgR3vrs_ILA",
  authDomain: "deinlog.firebaseapp.com",
  projectId: "deinlog",
  storageBucket: "deinlog.appspot.com",
  messagingSenderId: "983079717547",
  appId: "1:983079717547:web:e5b305ef9e6dce353805ee",
  measurementId: "G-NQW3WK9KP9",
};

// change this to activate emulation
const dev = true;

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
