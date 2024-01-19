// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyClLEFdF8YlkMDhaNpp8bhmfGBA36qJsYc",
   authDomain: "bmes-vr-app.firebaseapp.com",
   projectId: "bmes-vr-app",
   storageBucket: "bmes-vr-app.appspot.com",
   messagingSenderId: "152788343055",
   appId: "1:152788343055:web:d8f3d3f6b350fb4509c67a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export SDK properties
export const auth = getAuth(app);
export const db = getFirestore(app);
