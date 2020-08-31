import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Link, Switch} from 'react-router-dom'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import ProfilePage from './ProfilePage'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
