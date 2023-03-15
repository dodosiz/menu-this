// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
