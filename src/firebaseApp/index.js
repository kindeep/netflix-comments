import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export let googleAuthProvider, db;

const firebaseConfig = {
  apiKey: "AIzaSyA9dW1g1hRTm_W7n8ByqmhwmM3GCf2tK9w",
  authDomain: "netflix-comments.firebaseapp.com",
  databaseURL: "https://netflix-comments.firebaseio.com",
  projectId: "netflix-comments",
  storageBucket: "netflix-comments.appspot.com",
  messagingSenderId: "678514319671",
  appId: "1:678514319671:web:010925e266749bde27fab2",
  measurementId: "G-NVCQ63DKWH",
};

export function initFirebase() {
  firebase.initializeApp(firebaseConfig);

  db = firebase.firestore();

  googleAuthProvider = new firebase.auth.GoogleAuthProvider();
}

function signIn(provider) {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

function googleSignIn() {
  signIn(googleAuthProvider);
}
