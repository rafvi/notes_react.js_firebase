import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    apiId: process.env.REACT_APP_API_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth();

export default {
    firebaseConfig,
}