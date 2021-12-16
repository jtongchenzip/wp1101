import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, TextField } from '@material-ui/core';
import Header from '../../components/ui/Header';

export default function Login() {
  return (
    <>
      <Header title="Hackthon Online Judge System" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <TextField hiddenLabel id="outlined-required" label="Username" variant="outlined" />
        <TextField hiddenLabel id="outlined-required" style={{ marginTop: 30 }} label="Password" variant="outlined" />
        <div style={{ marginTop: 20 }}>
          <Button color="primary" variant="outlined">
            Register
          </Button>
          <Link to="/ui-components">
            <Button color="primary" variant="contained">
              Login
            </Button>
          </Link>
        </div>
        <Typography color="primary" style={{ marginTop: 10 }} variant="h8">
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
