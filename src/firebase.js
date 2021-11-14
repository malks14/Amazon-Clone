import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyCsFsaexeMbyYZKocC4O8ZnzPWtVqQAFfk",
  authDomain: "clone-app-850bb.firebaseapp.com",
  projectId: "clone-app-850bb",
  storageBucket: "clone-app-850bb.appspot.com",
  messagingSenderId: "215696973142",
  appId: "1:215696973142:web:29793dadf78c86c34d0af7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
