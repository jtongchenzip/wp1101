import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Button, Typography, TextField, makeStyles,
} from '@material-ui/core';

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

  return (
    <>
<<<<<<< HEAD
      <Header title="Hackthon Online Judge System" />
      <div
        className="content-layout"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField hiddenLabel id="outlined-required" label="Username" variant="outlined" />
        <TextField hiddenLabel id="outlined-required" style={{ marginTop: 30 }} label="Password" variant="outlined" />
        <div style={{ marginTop: 20 }}>
=======
      <div className={classes.main}>
        <TextField id="outlined-required" label="Username" />
        <TextField id="outlined-required" style={{ marginTop: 50 }} label="Password" />
        <div className={classes.buttonGroup}>
>>>>>>> main
          <Button color="primary" variant="outlined">
            Register
          </Button>
          <Link to="/ui-components">
            <Button color="primary" variant="contained">
              Login
            </Button>
          </Link>
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
