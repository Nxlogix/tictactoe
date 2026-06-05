import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCsUcjZSxRgNlz8tSXgh4KuYZBtwWfg50",
  authDomain: "tictactoeonlines.firebaseapp.com",
  projectId: "tictactoeonlines",
  storageBucket: "tictactoeonlines.firebasestorage.app",
  messagingSenderId: "597026435635",
  appId: "1:597026435635:web:0bc2b1b746197276c6a946"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);