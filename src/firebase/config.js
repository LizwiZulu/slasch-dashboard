import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

let app;

// Check if the app is already initialized
if (!firebase.apps.length) {
  app = firebase.initializeApp({
    apiKey: "AIzaSyANBLmOODXkoglo2c77Zri8ErkiN0k8KBY",
    authDomain: "adlinc-community-e391a.firebaseapp.com",
    projectId: "adlinc-community-e391a",
    storageBucket: "adlinc-community-e391a.appspot.com",
    messagingSenderId: "871894259823",
    appId: "1:871894259823:web:250e5ee5a13f8afa0dd59a",
    measurementId: "G-5VHG5PB2XD"
  });
} else {
  app = firebase.app();
}

const storage = firebase.storage();
const auth = firebase.auth();

export { app, auth, storage };