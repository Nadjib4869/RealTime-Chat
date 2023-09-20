// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoh6gYZW6D0rQRBaJkwxlmNxW82bXSdZo",
  authDomain: "chat-app-21a31.firebaseapp.com",
  projectId: "chat-app-21a31",
  storageBucket: "chat-app-21a31.appspot.com",
  messagingSenderId: "591109701535",
  appId: "1:591109701535:web:40753ef073c1fccaa4c7aa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
