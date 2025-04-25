// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth" ;
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbQjmSDa-lpl-hTce1eyDNIUX63d9o04c",
  authDomain: "expense-tracker-3eff6.firebaseapp.com",
  projectId: "expense-tracker-3eff6",
  storageBucket: "expense-tracker-3eff6.appspot.com",
  messagingSenderId: "931498393924",
  appId: "1:931498393924:web:92d1fdbb82108ba2ef5711",
  measurementId: "G-66TSSP5113"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy