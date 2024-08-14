// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6rKdL84CeyJD7cI0q89nzggOwsv83ggw",
  authDomain: "kosmo-c6ff3.firebaseapp.com",
  databaseURL: "https://kosmo-c6ff3-default-rtdb.firebaseio.com",
  projectId: "kosmo-c6ff3",
  storageBucket: "kosmo-c6ff3.appspot.com",
  messagingSenderId: "481240233192",
  appId: "1:481240233192:web:963ff273b8fb6c28a9455d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);