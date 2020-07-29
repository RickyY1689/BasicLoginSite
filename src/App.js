import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Link, Switch} from 'react-router-dom'
import About from './About'
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import SignInPage from './SignInPage'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={About} /> 
        <Route path="/log-in" component={LoginPage}/>
        <Route path="/secret" component={SignInPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;
