// src/firebase/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmA9Xzjw-uKp96mq5ltePhM2Yg0D5xAGY",
  authDomain: "fake-a4189.firebaseapp.com",
  projectId: "fake-a4189",
  storageBucket: "fake-a4189.firebasestorage.app",
  messagingSenderId: "215922448979",
  appId: "1:215922448979:web:45fee1e4272afd379f44a6",
  measurementId: "G-7WK1GR1HPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export the services you want to use
export { auth, analytics };
