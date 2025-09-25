// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2hFV3asSn28RizHN5JGml42N77KOAXe4",
  authDomain: "wslc-415-416.firebaseapp.com",
  databaseURL: "https://wslc-415-416-default-rtdb.firebaseio.com",
  projectId: "wslc-415-416",
  storageBucket: "wslc-415-416.firebasestorage.app",
  messagingSenderId: "272458964949",
  appId: "1:272458964949:web:ad62f6381e0778d2d5e75c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;