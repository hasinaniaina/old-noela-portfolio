import {initializeApp} from 'firebase/app';
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const process = import.meta.env;
const firebaseConfig = {
    apiKey: process.VITE_FIREBASE_APIKEY,
    authDomain: process.VITE_FIREBASE_AUTHDOMAIN,
    projectId: process.VITE_FIREBASE_PROJECTID,
    storageBucket: process.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: process.VITE_FIREBASE_APPID
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export default app