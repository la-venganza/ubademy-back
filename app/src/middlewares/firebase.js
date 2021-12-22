const { initializeApp } = require('firebase-admin/app');
const firebaseAuth = require('firebase-admin/auth');
const admin = require('firebase-admin');
const AuthError = require('../errors/authError');
require('dotenv').config();
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const firebaseConfig = {
  credential: admin.credential.cert({
    httpAgent: undefined,
    implicit: true,
    projectId: 'ubademy',
    privateKey: `${process.env.FIREBASE_PRIVATE_KEY}`.replace(/\\n/g, '\n'),
    clientEmail: 'firebase-adminsdk-7a43r@ubademy.iam.gserviceaccount.com',
    httpClient: {
      retry: {
        maxRetries: 4,
        statusCodes: [Array],
        ioErrorCodes: [Array],
        backOffFactor: 0.5,
        maxDelayInMillis: 60000,
      },
    },
  }),
  apiKey: `${process.env.FIREBASE_APIKEY}`,
  authDomain: `${process.env.FIREBASE_AUTHDOMAIN}`,
  projectId: `${process.env.FIREBASE_PROJECTID}`,
  storageBucket: `${process.env.FIREBASE_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.FIREBASE_MESSAGINGSENDERID}`,
  appId: `${process.env.FIREBASE_APPID}`,
};

const app = initializeApp(firebaseConfig);

const auth = firebaseAuth.getAuth(app);

const db = getFirestore();

async function verifyIdToken(token) {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (e) {
    throw new AuthError(e, 'Firebase');
  }
}

async function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  const result = await auth
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      const users = [];
      if (listUsersResult.pageToken) {
        // List next batch of users.
        users.concat(listAllUsers(listUsersResult.pageToken));
      }
      return users.concat(listUsersResult);
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
  return result;
}

const incrementGoogleLogin = async () => {
  const metricRef = db.collection('metrics').doc('federated-login');
  const res = await metricRef.update({
    total: FieldValue.increment(1),
  });
  return res;
};

const incrementPasswordLogin = async () => {
  const metricRef = db.collection('metrics').doc('password-login');
  const res = await metricRef.update({
    total: FieldValue.increment(1),
  });
  return res;
};

const getGoogleLoginMetrics = async () => {
  const googleMetricRef = await db.collection('metrics').doc('federated-login').get();
  if (googleMetricRef.exists) {
    return googleMetricRef.data().total;
  }
  return 0;
};

const getPasswordLoginMetrics = async () => {
  const passwordMetricRef = await db.collection('metrics').doc('password-login').get();
  if (passwordMetricRef.exists) {
    return passwordMetricRef.data().total;
  }
  return 0;
};

module.exports = {
  verifyIdToken, listAllUsers, incrementGoogleLogin, incrementPasswordLogin, getGoogleLoginMetrics, getPasswordLoginMetrics,
};
