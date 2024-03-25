/* eslint-disable unused-imports/no-unused-vars */
// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAKBiX8VYehn3Jo9UdcNeRk_FiqpLyOCRo',
  authDomain: 'metabolic-b97d2.firebaseapp.com',
  projectId: 'metabolic-b97d2',
  storageBucket: 'metabolic-b97d2.appspot.com',
  messagingSenderId: '558781711021',
  appId: '1:558781711021:web:e0608cc9b1ea72dc693c24',
  measurementId: 'G-YCT61GLY94',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

export const storage = getStorage();
