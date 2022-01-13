import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useHistory, BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Header from '../components/ui/Header';
import Login from './auth/Login';
import Register from './auth/Register';
import UIComponentUsage from '../UIComponentUsage';
import Pages from './page';
import '../App.css';

export default function Index() {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.isAuthenticated || user.tokenExpired) {
      localStorage.clear();
      history.push('/login');
    } else {
      history.push('/');
    }
  }, [history, user.isAuthenticated, user.tokenExpired]);

  return (
    <div className="wrapper">
      {/* <Router> */}
      <Header title="Hackathon Online Judge System" />
      <div className="content-layout">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/ui-components" component={UIComponentUsage} />
          <Route path="/" component={Pages} />
        </Switch>
      </div>
      {/* </Router> */}
    </div>
  );
}
