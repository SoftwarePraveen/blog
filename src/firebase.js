// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr37wipYKUvd8CVByeJGjBD-4RZUQb_gU",
  authDomain: "blogproject-a688e.firebaseapp.com",
  projectId: "blogproject-a688e",
  storageBucket: "blogproject-a688e.firebasestorage.app",
  messagingSenderId: "304572409309",
  appId: "1:304572409309:web:fc1e7a4917c39f48608234",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db, storage };
