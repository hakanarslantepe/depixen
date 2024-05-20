// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_IiIo6cU7IWNE7iuI-tfnnLfyRfnVTek",
  authDomain: "depixen-705b7.firebaseapp.com",
  databaseURL: "https://depixen-705b7-default-rtdb.firebaseio.com",
  projectId: "depixen-705b7",
  storageBucket: "depixen-705b7.appspot.com",
  messagingSenderId: "299790730362",
  appId: "1:299790730362:web:f42fafe76b8ca2613de7c3",
  measurementId: "G-FGT2BC93W9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);

