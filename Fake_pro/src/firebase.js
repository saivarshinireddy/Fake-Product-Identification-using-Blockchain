import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMgdgW7u48-xAhiqaX44a_7rPPmBqt1NM",
  authDomain: "fake-pro-auth.firebaseapp.com",
  projectId: "fake-pro-auth",
  storageBucket: "fake-pro-auth.appspot.com",
  messagingSenderId: "237831231470",
  appId: "1:237831231470:web:74dc5d19d3c2538f9fa0ff",
  measurementId: "G-ZN00GHQ2KS"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };