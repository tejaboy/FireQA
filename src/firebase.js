import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyB1pcqTcUpMv-Uja4Okug6AM_GMW-P9oeo",
    authDomain: "fireqa-git-test.firebaseapp.com",
    databaseURL: "https://fireqa-git-test.firebaseio.com",
    projectId: "fireqa-git-test",
    storageBucket: "fireqa-git-test.appspot.com",
    messagingSenderId: "248663213035",
    appId: "1:248663213035:web:b04215fafd71b4df2c8fae"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;