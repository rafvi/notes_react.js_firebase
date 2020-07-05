import React, { useContext } from 'react';
import { firebaseAuthContext } from './components/Provider/AuthProvider'
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import Home from './components/Home';

import './App.css';

const App = () => {
  const { token } = useContext(firebaseAuthContext)
  console.log("App.js - token: ", token)

  return (
    <>
      {/* switch allows switching which components render.  */}
      <div className="ui container app">
      <Switch >
        {/* route allows you to render by url path */}
        <Route exact path='/' render={rProps => token === null ? <SignIn /> : <Home />} />
        <Route exact path='/' component={SignIn} />
      </Switch>
    </div>
    </>
  );
}

export default App;