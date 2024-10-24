import { initializeApp } from "firebase/app"; // Import function to initialize the Firebase app
import { getFirestore } from 'firebase/firestore'; // Import Firestore database functions
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication functions

// Firebase configuration object containing keys and identifiers 
const firebaseConfig = {
    apiKey: "AIzaSyAjguEi1mhFuL67k9XoApURD9nveI6sKMI", // API key to connect to Firebase
    authDomain: "notes-web-app-961e6.firebaseapp.com", // Auth domain for Firebase Authentication
    projectId: "notes-web-app-961e6", // Unique identifier for your Firebase project
    storageBucket: "notes-web-app-961e6.appspot.com", // Storage bucket URL for Firebase Storage
    messagingSenderId: "291816182581", // Sender ID for Firebase Cloud Messaging
    appId: "1:291816182581:web:3d7021421afa104469727c", // App ID specific to this project
    measurementId: "G-20H4K3M044" // Measurement ID for Google Analytics
};

// Initialize the Firebase app with the provided config object
const app = initializeApp(firebaseConfig);

// Initialize Firestore (Firebase's NoSQL database) and Authentication service
const db = getFirestore(app); // Firestore database instance
const auth = getAuth(app); // Firebase Authentication instance


export { db, auth, app };

