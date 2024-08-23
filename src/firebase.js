// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByjPntkkIviQvCHPzDjoFs8U_9RV5eRZU",
  authDomain: "mouse-manager-app.firebaseapp.com",
  projectId: "mouse-manager-app",
  storageBucket: "mouse-manager-app.appspot.com",
  messagingSenderId: "819515747633",
  appId: "1:819515747633:web:b43f3bc63e2a2a58fe5410",
  measurementId: "G-CEY4KC587H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db };