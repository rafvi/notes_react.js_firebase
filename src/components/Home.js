import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './Menu';
import Notes from './Notes';
import EditNote from './EditNote';
import NewNote from './NewNote';

const Home = () => {
    return (
        <div>
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