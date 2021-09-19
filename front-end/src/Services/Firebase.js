import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { FacebookAuthProvider } from "firebase/compat/auth";
// import "dotenv";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// facebook
const facebookProvider = new firebase.auth.FacebookAuthProvider();

facebookProvider.setCustomParameters({
  'display': 'popup'
});
export const signInWithFacebook = async() => {
  // firebase.auth().signInWithPopup(facebookProvider).then(result =>{
  //   debugger
  //   let credential = result.credential
  //   let user = result.user
  //   let  accessToken = credential.accessToken;
  // })
  try {
    debugger
   await auth.signInWithPopup(facebookProvider);
  //  let user = res.user
  //  console.log(user)
  } catch (error) {
    alert(error)
  }
}

// firebase
//   .auth()
//   .signInWithPopup(provider)
//   .then((result) => {
//     /** @type {firebase.auth.OAuthCredential} */
//     var credential = result.credential;

//     // The signed-in user info.
//     var user = result.user;

//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     var accessToken = credential.accessToken;

//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;

//     // ...
//   });


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


 export default firebase