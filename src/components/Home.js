import React, { useContext } from 'react';
import { firebaseAuthContext } from './Provider/AuthProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './Menu';
import Notes from './Notes';
import EditNote from './EditNote';
import NewNote from './NewNote';

const Home = () => {
    const { handleSignOut, } = useContext(firebaseAuthContext);

    return (
        <div>
            Home, login Success !
            <button onClick={handleSignOut}>Sign Out</button>
            <Router>
                <div className="ui container app">
                    <Menu />
                    <Route path='/newnote' component={NewNote} />
                    <Route path='/editnote' component={EditNote} />
                    <Route path='/notes' component={Notes} />
                </div>
            </Router>
        </div>
    );
};

export default Home;