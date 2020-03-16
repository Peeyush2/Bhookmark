import firebase from 'firebase'
import 'firebase/auth'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyCbfVBZZOIYWOExqvI5V1SwTC_7zD6vQ_s",
  authDomain: "https://light-ratio-240612.firebaseapp.com",
  databaseURL: "https://light-ratio-240612.firebaseapp.com",
  storageBucket: "https://light-ratio-240612.appspot.com",
  messagingSenderId: "808680520830"
};
var fire = firebase.initializeApp(config);
//const baseDb = myFirebase.firestore();
//export const db = baseDb;
export default fire;