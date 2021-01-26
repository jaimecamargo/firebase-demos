import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_RleKGS8C0WnIMGdYvAdNoQZntCdJ3eA",
    authDomain: "jaimecamargo-sql-demos.firebaseapp.com",
    databaseURL: "https://jaimecamargo-sql-demos-default-rtdb.firebaseio.com",
    projectId: "jaimecamargo-sql-demos",
    storageBucket: "jaimecamargo-sql-demos.appspot.com",
    messagingSenderId: "380119984462",
    appId: "1:380119984462:web:ec9ea9bf6c70a3f85d161f",
    measurementId: "G-DXGDE3KZXM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log('Firebase configurado');

export default firebase.firestore();