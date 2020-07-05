import firebaseConfig from './firebaseConfig';
import firebase from 'firebase';

export const authMethods = {
    doSignInWithEmailAndPassword: (email, password, setErrors, setToken) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async res => {
                const token = await Object.entries(res.user)[5][1].b
                // set token to localStorage
                await localStorage.setItem('token', token)
                setToken(window.localStorage.token)
                console.log("authMethods.js -> doSignInWithEmailAndPassword -> firebase.auth().signInWithEmailAndPassword -> res -> token: ", token)
                console.log("authMethods.js -> doSignInWithEmailAndPassword -> firebase.auth().signInWithEmailAndPassword -> res: ", res)
                console.log("authMethods.js -> doSignInWithEmailAndPassword -> firebase.auth().signInWithEmailAndPassword -> res -> email: ", email, "password: ", password)
            })
            .catch(err => {
                setErrors(prev => ([...prev, err.message]))
            })
    },
    doSignOut: (setErrors, setToken) => {
        // signOut is a no argument function
        firebase.auth().signOut().then(res => {
            //remove the token
            localStorage.removeItem('token')
            //set the token back to original state
            setToken(null)
        })
            .catch(err => {
                //there shouldn't every be an error from firebase but just in case
                setErrors(prev => ([...prev, err.message]))
                //whether firebase does the trick or not i want my user to do there thing.
                localStorage.removeItem('token')
                setToken(null)
                console.error(err.message)
            })
    },
};

export default authMethods;