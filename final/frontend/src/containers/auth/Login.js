import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button, Typography, TextField, makeStyles,
} from '@material-ui/core';
import { logIn } from '../../actions/user/auth';

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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector((state) => state.user);

  const handleLogIn = () => {
    if (username.trim() !== '' && password.trim() !== '') {
      dispatch(logIn(username.trim(), password.trim()));
    }
  };

  return (
    <>
      <div className={classes.main}>
        <TextField id="outlined-required" label="Username" onChange={(e) => setUsername(e.target.value)} />
        <TextField id="outlined-required" style={{ marginTop: 50 }} label="Password" onChange={(e) => setPassword(e.target.value)} />
        <div className={classes.buttonGroup}>
          <Button color="primary" variant="outlined">
            Register
          </Button>
          <Button color="primary" variant="contained" onClick={handleLogIn}>
            Login
          </Button>
        </div>
        <Typography color="primary" style={{ marginTop: 20 }} variant="h8">
          Cypress Online Judge System
        </Typography>
        <Typography align="center" color="primary" variant="h8">
          Department of Information Management
        </Typography>
        <Typography color="primary" variant="h8">
          National Taiwan University
        </Typography>
      </div>
    </>
  );
}
