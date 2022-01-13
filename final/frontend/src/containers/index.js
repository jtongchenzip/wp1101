import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Switch, Route } from 'react-router-dom';
import Header from '../components/ui/Header';
import Login from './auth/Login';
import Register from './auth/Register';
import UIComponentUsage from '../UIComponentUsage';
import Pages from './page';
import { readAccount } from '../actions/user/auth';
import '../App.css';

const AUTH_TOKEN = 'auth-token';
const ACCOUNT_ID = 'account-id';

export default function Index() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const token = localStorage.getItem(AUTH_TOKEN);
  const account_id = localStorage.getItem(ACCOUNT_ID);

  useEffect(() => {
    if (!user.isAuthenticated) {
      if (token && account_id) {
        if (user.tokenExpired) {
          localStorage.clear();
          console.log('localStorage cleared');
          history.push('/login');
        } else {
          dispatch(readAccount(token, account_id));
        }
      } else {
        history.push('/login');
      }
    } else if (user.role === 'TA') {
      // dispatch(readAccount(token, account_id));
      // history.push('/ta');
    } else if (user.role === 'STUDENT') {
      // dispatch(readAccount(token, account_id));
      // history.push('/student');
    }
  }, [account_id, dispatch, history, token, user.isAuthenticated, user.role, user.tokenExpired]);

  return (
    <div className="wrapper">
      <Header title="Hackathon Online Judge System" />
      <div className="content-layout">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/ui-components" component={UIComponentUsage} />
          <Route path="/" component={Pages} />
        </Switch>
      </div>
    </div>
  );
}
