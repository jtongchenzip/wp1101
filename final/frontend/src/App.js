import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import store from './store';
import Index from './containers';
import theme from './theme';

// Login page, Index for test student and TA page
export default function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Index />
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}
