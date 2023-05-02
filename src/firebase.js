
  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHXJ-gFya7ybCTlOOb8XmWjKyPLk3FogQ",
  authDomain: "blessed-cbt.firebaseapp.com",
  projectId: "blessed-cbt",
  storageBucket: "blessed-cbt.appspot.com",
  messagingSenderId: "588104970700",
  appId: "1:588104970700:web:61e00d411f1866cbb52d69",
  measurementId: "G-J9WW0YX3E2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);