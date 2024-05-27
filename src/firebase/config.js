import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCtRiQxlP93HOHTyPBDaqzSqWukPFmTygg",
  authDomain: "react-cursos-9e10b.firebaseapp.com",
  projectId: "react-cursos-9e10b",
  storageBucket: "react-cursos-9e10b.appspot.com",
  messagingSenderId: "745305564801",
  appId: "1:745305564801:web:4b5bc05618a0e00d8c4f80"
};

export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);