import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC2yQWYZU52dAeoNutiusfRT8X4X5Nxfhg",
    authDomain: "hp-trivia-data-collection.firebaseapp.com",
    projectId: "hp-trivia-data-collection",
    storageBucket: "hp-trivia-data-collection.firebasestorage.app",
    messagingSenderId: "965556785590",
    appId: "1:965556785590:web:5676d96b4364879eeab117",
    measurementId: "G-FNREKPSD5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);