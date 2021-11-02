const { initializeApp } = require('firebase-admin/app');
const firebaseAuth = require("firebase-admin/auth")
const AuthError = require('../errors/authError')
require('dotenv').config();

const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_APIKEY}`,
  authDomain: `${process.env.FIREBASE_AUTHDOMAIN}`,
  projectId: `${process.env.FIREBASE_PROJECTID}`,
  storageBucket: `${process.env.FIREBASE_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.FIREBASE_MESSAGINGSENDERID}`,
  appId:`${process.env.FIREBASE_APPID}`
};

const app = initializeApp(firebaseConfig);

const auth = firebaseAuth.getAuth(app);

async function verifyIdToken (token) {
  try {
    console.log(Date.now())
    const decodedToken = await auth.verifyIdToken(token)
    console.log(Date.now())
    return decodedToken
   } catch (e) {
    console.log(e)
    throw new AuthError(e)
   }
}

module.exports = verifyIdToken