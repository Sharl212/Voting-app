import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

import './App.css';

import { Login } from './Login';
import { Register } from './Register';
import { PollsList } from './Polls-list';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div class="navbar-brand">Voting Application</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/polls">Polls</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Login</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

// class CreateANewPoll extends Component {

// }

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route path='/' exact={true} render={() => <Fragment><Navbar /><Login /></Fragment>} />
            <Route path='/register' exact={true} render={() => <Fragment><Navbar /><Register /></Fragment>} />
            <Route path='/polls' exact={true} render={() => <Fragment><Navbar /><PollsList /></Fragment>} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
};

export default App;
