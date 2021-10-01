const firebaseApp = require("firebase/app")
const firebaseAuth = require("firebase/auth")
require('dotenv').config();

const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_APIKEY}`,
  authDomain: `${process.env.FIREBASE_AUTHDOMAIN}`,
  projectId: `${process.env.FIREBASE_PROJECTID}`,
  storageBucket: `${process.env.FIREBASE_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.FIREBASE_MESSAGINGSENDERID}`,
  appId:`${process.env.FIREBASE_APPID}`
};

const app = firebaseApp.initializeApp(firebaseConfig);

const provider = new firebaseAuth.GoogleAuthProvider();

const auth = firebaseAuth.getAuth();
firebaseAuth.signInWithPopup(auth, provider)
  .then((result) => {
   
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;

  }).catch((error) => {
    
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    
    // The email of the user's account used.
    const email = error.email;
    
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

  });

