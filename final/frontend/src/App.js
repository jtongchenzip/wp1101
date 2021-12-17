import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UIComponentUsage from './UIComponentUsage';
import Login from './containers/auth/Login';
import store from './store';
import theme from './theme';

export default function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/ui-components" component={UIComponentUsage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}
