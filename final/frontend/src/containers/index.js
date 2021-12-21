import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/ui/Header';
import Login from './auth/Login';
import Register from './auth/Register';
import Student from './page/Student';
import TA from './page/TA';
import UIComponentUsage from '../UIComponentUsage';
import '../App.css';
import Student from './page/Student';

// 基本底層畫面、route by user role
// replace ScoreTable with student page or TA page
export default function index() {
  return (
    <div className="wrapper">
      <Header title="Hackthon Online Judge System" />
      <div className="content-layout">
<<<<<<< HEAD
        <Student />
=======
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/ui-components" component={UIComponentUsage} />
            <Route path="/student" component={Student} />
            <TA path="/ta" component={TA} />
          </Switch>
        </Router>
>>>>>>> frontend/refactor
      </div>
    </div>
  );
}
