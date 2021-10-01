// import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import ChatButton from "./ChatButton";
import Channel from "./Channel"
import { auth, app } from "../Services/Firebase";

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_AUTH_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// const app = firebase.initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth();
// export const auth = app.auth();
const db = firebase.firestore()

function Chat() {
  const [user, setUser] = useState(() => auth.currentUser);
  console.log("USER", user)
  // debugger
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe
  }, [initializing]);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (initializing) return "Loading...";

  return (
    <div>
      <h1>Firebase Chat</h1>
      {user ? (
        <>
          <ChatButton onClick={signOut}>Sign Out</ChatButton>
          <p>"Welcome to the chat"</p>
        </>
      ) : (
        <ChatButton onClick={signInWithGoogle}>Google Sign-In</ChatButton>
      )}
      <Channel user={user} db={db}/>
    </div>
  );
}

export default Chat;