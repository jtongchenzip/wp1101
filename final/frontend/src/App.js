import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UIComponentUsage from './UIComponentUsage';
import Login from './containers/auth/Login';
import Student from './containers/page/Student';
import theme from './theme';

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={Student} />
          <Route path="/ui-components" component={UIComponentUsage} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
