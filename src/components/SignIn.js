import React, { useContext } from 'react';
import { firebaseAuthContext } from './Provider/AuthProvider';

const SignIn = () => {

    const { handleSignIn, inputs, setInputs, errors } = useContext(firebaseAuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('SignIn.js: handleSubmit(e): ', e)
        handleSignIn();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("SignIn.js: handleChange() => inputs: ", inputs);
        setInputs(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="signin-page">
            <form onSubmit={handleSubmit} className="signin-form">
                <input
                    name="email"
                    type="text"
                    placeholder="e-mail"
                    onChange={handleChange}
                    value={inputs.email}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={handleChange}
                    value={inputs.password}
                />
                <button>LOGIN</button>
                {errors.length > 0 ? errors.map(error => <p style={{ color: 'red' }}>{error}</p>) : null}
            </form>
        </div>

    );
}

export default SignIn;