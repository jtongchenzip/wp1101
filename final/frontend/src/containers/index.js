import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/ui/Header';
import Login from './auth/Login';
import Register from './auth/Register';
import UIComponentUsage from '../UIComponentUsage';
import Pages from './page';
import '../App.css';

export default function index() {
  return (
    <div className="wrapper">
      <Router>
        <Header title="Hackthon Online Judge System" />
        <div className="content-layout">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/ui-components" component={UIComponentUsage} />
            <Route path="/" component={Pages} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
