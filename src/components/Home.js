import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './Menu';
import Notes from './Notes';
import EditNote from './EditNote';
import NewNote from './NewNote';
import Category from './Category';
import Header from './Header';

const Home = () => {
    return (
        <div>
            <Router>
                <Menu />
                <Header />
                <div className="ui container app">
                    <Route path='/newnote' component={NewNote} />
                    <Route path='/editnote' component={EditNote} />
                    <Route path='/notes' component={Notes} />
                    <Route path='/category' component={Category} />
                </div>
            </Router>
        </div>
    );
};

export default Home;