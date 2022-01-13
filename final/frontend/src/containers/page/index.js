import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Switch, Route } from 'react-router-dom';

import StudentHome from './StudentHome';
import StudentDetail from './StudentDetail';
import TAHome from './TAHome';
import TADetail from './TADetail';

export default function Pages() {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  if (!user.isAuthenticated) {
    history.push('/login');
  }

  return (
    <Switch>
      <Route path="/student" component={StudentHome} />
      <Route path="/student/problem/:problemId" component={StudentDetail} />
      <Route path="/ta" component={TAHome} />
      <Route path="/ta/problem/:problemId" component={TADetail} />
    </Switch>
  );
}
