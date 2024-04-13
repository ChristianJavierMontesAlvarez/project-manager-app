// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2dImgKgqK3-ze7APS-LH04mTvagwDoaA",
  authDomain: "projectmanagerapp-b2453.firebaseapp.com",
  projectId: "projectmanagerapp-b2453",
  storageBucket: "projectmanagerapp-b2453.appspot.com",
  messagingSenderId: "624945330643",
  appId: "1:624945330643:web:20bef13c0bbb7e30565726",
  storageBucket: 'gs://projectmanagerapp-b2453.appspot.com',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);