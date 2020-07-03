import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

// import Components
import Menu from './components/Menu';
import Notes from './components/Notes';
import EditNote from './components/EditNote';
import NewNote from './components/NewNote';
import SignIn from './components/SignIn';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="ui container app">
          <Menu />
          <Route exact path='/' component={SignIn} />
          <Route path='/newnote' component={NewNote} />
          <Route path='/editnote' component={EditNote} />
          <Route path='/notes' component={Notes} />
        </div>
      </Router>
    );


  }

}

export default App;
