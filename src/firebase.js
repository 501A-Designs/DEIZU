import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const db = firebase.firestore();
export const auth = firebase.auth();
// export const signInWithCustomToken = firebase.auth().signInWithCustomToken();
export const dataRef = db.collection('users');
export const optionsDataRef = db.collection('subjects');
export const root = document.documentElement;
export default firebase;