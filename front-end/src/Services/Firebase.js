import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({
  display: "popup",
});
export const signInWithFacebook = async () => {
  try {
    await auth.signInWithPopup(facebookProvider);
  } catch (error) {
    alert(error);
  }
};

const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const signInWithTwitter = async () => {
  try {
    await auth.signInWithPopup(twitterProvider);
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

export const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(googleProvider);
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

export const login = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
export const signUp = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);
// export const getFirebaseIdToken = () => firebase.auth().currentUser.getIdToken(false);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default firebase;
