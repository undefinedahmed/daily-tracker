// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB4Ba5R2T3-8qTV04h_My09xqkxr6_wpc",
  authDomain: "daily--tracker--app.firebaseapp.com",
  projectId: "daily--tracker--app",
  storageBucket: "daily--tracker--app.appspot.com",
  messagingSenderId: "187913015485",
  appId: "1:187913015485:web:5e459d10d4237c4eab67d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
