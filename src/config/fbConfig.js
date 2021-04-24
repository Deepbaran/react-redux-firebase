import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

var firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'react-redux-firebase-tut-76d67.firebaseapp.com',
  projectId: 'react-redux-firebase-tut-76d67',
  storageBucket: 'react-redux-firebase-tut-76d67.appspot.com',
  messagingSenderId: '856776411875',
  appId: '1:856776411875:web:ed0d31d2884f875f5e13d6',
  measurementId: 'G-NW4EYY2R1G'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore.settings({ timestampsinsnapshots: true });
firebase.analytics();

export default firebase;
