import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export let googleAuthProvider, db, firebaseApp;

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

  firebaseApp = firebase;

  db = firebase.firestore();

  googleAuthProvider = new firebase.auth.GoogleAuthProvider();
}

/*
P {N: Array(0), l: "AIzaSyA9dW1g1hRTm_W7n8ByqmhwmM3GCf2tK9w", m: "[DEFAULT]", s: "netflix-comments.firebaseapp.com", a: Ei, …}
$: un {l: false, settings: Xl, app: FirebaseAppImpl, b: Ei, P: Array(0), …}
B: pm {c: 30000, f: 960000, h: ƒ, i: ƒ, g: ƒ, …}
N: []
O: lm {a: P, b: Array(0), enrolledFactors: Array(0), c: ƒ}
P: true
R: [ƒ]
W: []
Yb: P {N: Array(0), l: "AIzaSyA9dW1g1hRTm_W7n8ByqmhwmM3GCf2tK9w", m: "[DEFAULT]", s: "netflix-comments.firebaseapp.com", a: Ei, …}
Z: ƒ ()
a: Ei {c: "AIzaSyA9dW1g1hRTm_W7n8ByqmhwmM3GCf2tK9w", u: "https://securetoken.googleapis.com/v1/token", m: We, g: {…}, h: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/", …}
aa: un {l: false, settings: Xl, app: FirebaseAppImpl, b: Ei, P: Array(0), …}
b: sm {c: Ei, a: "AE0u-Ncc0x8CBEBzsbqiEKUeHL95uVlmcV_eWOxKVmVkXy-7oW…ynE1YFGTYRwzDzU1wbFAbD-_X-T2FsnMfzTT0WH-TXWGHv_3o", b: eg}
displayName: "Kindeep Singh Kargil"
eb: null
email: "kindeepsingh@gmail.com"
emailVerified: true
ga: hn {a: "AIzaSyA9dW1g1hRTm_W7n8ByqmhwmM3GCf2tK9w:[DEFAULT]", b: Mk}
h: null
i: zl {i: {…}, w: 1599069587276, D: "netflix-comments.firebaseapp.com", u: "AIzaSyA9dW1g1hRTm_W7n8ByqmhwmM3GCf2tK9w", m: "[DEFAULT]", …}
isAnonymous: false
l: "AIzaSyA9dW1g1hRTm_W7n8ByqmhwmM3GCf2tK9w"
m: "[DEFAULT]"
metadata: xm {a: "1599069521969", b: "1599069521969", lastSignInTime: "Wed, 02 Sep 2020 17:58:41 GMT", creationTime: "Wed, 02 Sep 2020 17:58:41 GMT"}
multiFactor: lm {a: P, b: Array(0), enrolledFactors: Array(0), c: ƒ}
na: undefined
oa: null
phoneNumber: null
photoURL: "https://lh3.googleusercontent.com/a-/AOh14Gg0QRA7RqtQJ3pENQQ1J-tW38MuCs8n4NQaLPYGKpQ"
providerData: [zm]
refreshToken: "AE0u-Ncc0x8CBEBzsbqiEKUeHL95uVlmcV_eWOxKVmVkXy-7oWWJVq0r0C9vDGQiVcvmIAxSiIf78Dajt7bJbTUVrDcRS9sAibtEtJvyADUFMShxY_CumkKLya_2K_dw1HWvj6-9WDUQsn56c4wXfdUkSjOPveai-sKL22LNw8cU3eHLVqf0b8ClofXpxAcgVcXxu8y6d6D2fssZH6fO43VcrEg6rpwhPouDoqwfvfd0lS96Oyn5YgPjIsa0bQzi0n9GyrXbMEAVJSMJH4FcL_RUrW5GhValzt3XLkXNmiP-F4r_YBYyzOn0s05kIB_W5QiuAEuUSzg9cPxBqxDr-ymhRYGZVOZpFpzQPia1TABMr1dgSVztXp3_HVnbYBk1LCoxACynE1YFGTYRwzDzU1wbFAbD-_X-T2FsnMfzTT0WH-TXWGHv_3o"
s: "netflix-comments.firebaseapp.com"
tenantId: null
u: dd {src: P, a: {…}, b: 4}
uid: "sQW6LaWVzFNyGQLIHs5sHqzZiwz1"
wa: false
xa: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUxMDM2YWYyZDgzOWE4NDJhZjQzY2VjZmJiZDU4YWYxYTc1OGVlYTIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiS2luZGVlcCBTaW5naCBLYXJnaWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2cwUVJBN1JxdFFKM3BFTlFRMUotdFczOE11Q3M4bjROUWFMUFlHS3BRIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL25ldGZsaXgtY29tbWVudHMiLCJhdWQiOiJuZXRmbGl4LWNvbW1lbnRzIiwiYXV0aF90aW1lIjoxNTk5MDY5NTg3LCJ1c2VyX2lkIjoic1FXNkxhV1Z6Rk55R1FMSUhzNXNIcXpaaXd6MSIsInN1YiI6InNRVzZMYVdWekZOeUdRTElIczVzSHF6Wml3ejEiLCJpYXQiOjE1OTkwNjk1ODcsImV4cCI6MTU5OTA3MzE4NywiZW1haWwiOiJraW5kZWVwc2luZ2hAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTI2MDc2MjkyMjE1NzA1OTE2MTYiXSwiZW1haWwiOlsia2luZGVlcHNpbmdoQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.GiWTmLLceigsjelVGEZQdx_azgvRTJKRnjRHDxOLtq8LdYe95srSw-tjUKR4zcZjMqyBRhRR7GRgv6OPVeKRFpKhrDf1t0LA0lR-5Igp-FiDs9eWhCD5NyT20CiUlsxI5njzlzrwEK3pJzMEG9uva5nllweQg2Zc7vZxaSY6o7I_tE9NHJJPO9fRzbdzp-NSOD-nEEi0rO-J3By4p_yeoGtNnx_Yi5SXX14JgCZ0iMb7TOVrheoKSBWGmz1u8YG74uCz3xyVszhb1hSXB1D4m6qjHQ4vg6NynN1bvY4Fo0fX9AaianqhN_NJfRWVaw1dglPpW9VfTKCzllQ2tF2agg"
ya: ƒ (e)
za: ƒ (e)
_lat: "eyJhbGc
*/

export function authUserToAppUser(user) {
  return {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
  };
}

function signIn(provider) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(user);
        const appUser = authUserToAppUser(user);
        console.log(appUser);
        db.collection("users")
          .doc(appUser.uid)
          .set(appUser, { merge: true })
          .then(() => {
            console.log("noice");
          })
          .catch((e) => {
            console.error(e);
          });
        resolve(appUser);
      })
      .catch(function (error) {
        reject(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  });
}

export async function googleSignIn() {
  return await signIn(googleAuthProvider);
}

export async function signOut() {
  console.log("wut");
  return await firebaseApp.auth().signOut();
}

export async function addComment(text, videoId, uid) {
  console.log(`videos/${videoId}/comments`);
  console.log({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    text,
    user: db.doc(`users/${uid}`),
  });
  db.collection(`videos/${videoId}/comments`).add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    text,
    user: db.doc(`users/${uid}`),
  });
}
