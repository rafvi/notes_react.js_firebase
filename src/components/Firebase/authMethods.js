import firebaseConfig from './firebaseConfig';
import firebase from 'firebase';

export const authMethods = {
    doSignInWithEmailAndPassword: (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
};