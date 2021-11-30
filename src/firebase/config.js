import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB0bez0OFQBN2QqRIVWT-uWvvXXMDZufec',
  authDomain: 'my-money-a0335.firebaseapp.com',
  projectId: 'my-money-a0335',
  storageBucket: 'my-money-a0335.appspot.com',
  messagingSenderId: '480191043592',
  appId: '1:480191043592:web:4314945ad335b8a09659bd',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
