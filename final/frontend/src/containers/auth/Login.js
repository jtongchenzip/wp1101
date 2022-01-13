import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button, Typography, TextField, makeStyles,
} from '@material-ui/core';
import { logIn } from '../../actions/user/auth';

const AUTH_TOKEN = 'auth-token';
const ACCOUNT_ID = 'account-id';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 220,
  },
  buttonGroup: {
    marginTop: 40,
    width: 260,
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async () => {
    if (username.trim() !== '' && password.trim() !== '') {
      await dispatch(logIn(username.trim(), password.trim()));
    }
  };

  useEffect(() => {
    console.log(user);
    if (user.isAuthenticated) {
      localStorage.setItem(AUTH_TOKEN, user.token);
      localStorage.setItem(ACCOUNT_ID, user.id);
      history.push('/');
    }
  }, [user.is_authenticated, user.token, user.id, user.role, history, user]);

  return (
    <>
      <div className={classes.main}>
        <TextField label="Username" onChange={(e) => setUsername(e.target.value)} />
        <TextField style={{ marginTop: 50 }} label="Password" onChange={(e) => setPassword(e.target.value)} />
        <div className={classes.buttonGroup}>
          <Button color="primary" variant="outlined" onClick={() => { history.push('/register'); }}>
            Register
          </Button>
          <Button color="primary" variant="contained" onClick={handleLogIn}>
            Login
          </Button>
        </div>
        <Typography color="primary" style={{ marginTop: 20 }} variant="body1">
          Cypress Online Judge System
        </Typography>
        <Typography align="center" color="primary" variant="body1">
          Department of Information Management
        </Typography>
        <Typography color="primary" variant="body1">
          National Taiwan University
        </Typography>
      </div>
    </>
  );
}
