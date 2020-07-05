import React, { useState } from 'react';
import authMethods from '../Firebase/authMethods';

const AuthProvider = (props) => {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState([]);
    const [token, setToken] = useState(null);

    const handleSignIn = () => {
        // middle man between firebase and signin
        // calling signin from firebase server
        authMethods.doSignInWithEmailAndPassword(inputs.email, inputs.password, setErrors, setToken);
        console.log("AuthProvider.js -> handleSignIn() -> ", "-inputs: ",  inputs, "-Error: ",  errors, "-Token: ", token)
    }

    const handleSignOut = () => {
        authMethods.doSignOut(setErrors, setToken)
    }

    return (
        <firebaseAuthContext.Provider
            value={{
                handleSignIn,
                token,
                inputs,
                setInputs,
                errors,
                handleSignOut
            }}>
            {props.children}
        </firebaseAuthContext.Provider>
    )
};



export default AuthProvider;

export const firebaseAuthContext = React.createContext();