import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBFqX5s37Uufi8tNZyjRUK0gqDEL8aea-E",
  authDomain: "bhookmark-dc3f9.firebaseapp.com",
  databaseURL: "https://bhookmark-dc3f9.firebaseio.com",
  projectId: "bhookmark-dc3f9",
  storageBucket: "bhookmark-dc3f9.appspot.com",
  messagingSenderId: "1000479857892",
  appId: "1:1000479857892:web:3d6a3ad365b670df1420f1",
  measurementId: "G-6J2XEF5FPM"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebase;