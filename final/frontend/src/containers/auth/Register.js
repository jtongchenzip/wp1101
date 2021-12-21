import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Typography, TextField, makeStyles,
} from '@material-ui/core';
import '../../App.css';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 140,
  },
  registerForm: {
    marginBottom: 50,
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.main}>
        <TextField id="outlined-required" className={classes.registerForm} label="Student ID" />
        <TextField id="outlined-required" className={classes.registerForm} label="Email" />
        <TextField id="outlined-required" className={classes.registerForm} label="Username" />
        <TextField id="outlined-required" className={classes.registerForm} label="Password" />
        <Button color="primary" variant="contained">Register</Button>
      </div>
    </>
  );
}
