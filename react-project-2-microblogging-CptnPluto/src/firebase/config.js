import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCN4VnzMrqC5mYQXgaPeDvgouyLcSOpC9k",
    authDomain: "dnessaiver-microblogging.firebaseapp.com",
    projectId: "dnessaiver-microblogging",
    storageBucket: "dnessaiver-microblogging.appspot.com",
    messagingSenderId: "714516869880",
    appId: "1:714516869880:web:07f421a429356965aa810d",
    measurementId: "G-LMCD9JNVBS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Iniitalize Firestore
const db = getFirestore(app);

// Init Firebase Auth
const auth = getAuth(app);

// Init Storage
const storage = getStorage(app);

export { db, auth, storage };
