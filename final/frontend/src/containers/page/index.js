import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Switch, Route } from 'react-router-dom';

import StudentHome from './StudentHome';
import StudentDetail from './StudentDetail';
import TAHome from './TAHome';
import TADetail from './TADetail';

import { readAccount } from '../../actions/user/auth';

const AUTH_TOKEN = 'auth-token';
const ACCOUNT_ID = 'account-id';

export default function Pages() {
  const history = useHistory();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  const token = localStorage.getItem(AUTH_TOKEN);
  const account_id = localStorage.getItem(ACCOUNT_ID);

  useEffect(() => {
    if (!token) {
      history.push('/login');
    } else {
      dispatch(readAccount(token, account_id));
    }
  }, [account_id, dispatch, history, token]);

  return (
    <Switch>
      <Route path="/student" component={StudentHome} />
      <Route path="/student/problem/:problemId" component={StudentDetail} />
      <Route path="/ta" component={TAHome} />
      <Route path="/ta/problem/:problemId" component={TADetail} />
    </Switch>
  );
}
