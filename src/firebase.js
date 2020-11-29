 import firebase from 'firebase'
 import 'firebase/firestore'
 
  var firebaseConfig = {
    apiKey: "AIzaSyC3-bQgrg1g_wRtAZQWhJBpEE-EFykT66M",
    authDomain: "todoreact-591d0.firebaseapp.com",
    databaseURL: "https://todoreact-591d0.firebaseio.com",
    projectId: "todoreact-591d0",
    storageBucket: "todoreact-591d0.appspot.com",
    messagingSenderId: "649904928207",
    appId: "1:649904928207:web:1cbe109c2a43440da50eba"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();