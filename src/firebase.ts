import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyA4Kp5PYzPJPQRIS3wA4MWP_8ElZctb9Mw",
  authDomain: "linkedinwriter.firebaseapp.com",
  projectId: "linkedinwriter",
  storageBucket: "linkedinwriter.firebasestorage.app",
  messagingSenderId: "979203456907",
  appId: "1:979203456907:web:7df279d3b995af944bf98e",
  measurementId: "G-GW67QY6927"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const functions = getFunctions(app);

export const enhancePost = httpsCallable(functions, 'enhancePost');