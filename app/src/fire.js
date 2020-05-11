import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
  var firebaseConfig = {
    apiKey: "AIzaSyCbfVBZZOIYWOExqvI5V1SwTC_7zD6vQ_s",
    authDomain: "light-ratio-240612.firebaseapp.com",
    databaseURL: "https://light-ratio-240612.firebaseio.com",
    projectId: "light-ratio-240612",
    storageBucket: "light-ratio-240612.appspot.com",
    messagingSenderId: "808680520830",
    appId: "1:808680520830:web:e19dd4c38f6d18b13dac2f",
    measurementId: "G-XCD9P6BY3K"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebase;