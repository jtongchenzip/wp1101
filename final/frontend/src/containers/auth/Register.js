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
        <TextField hiddenLabel id="outlined-required" label="Student ID" variant="outlined" />
        <TextField hiddenLabel id="outlined-required" style={{ marginTop: 30 }} label="Email" variant="outlined" />
        <TextField hiddenLabel id="outlined-required" style={{ marginTop: 30 }} label="Username" variant="outlined" />
        <TextField hiddenLabel id="outlined-required" style={{ marginTop: 30 }} label="Password" variant="outlined" />
        <Button color="primary" variant="contained" style={{ marginTop: 50 }}>Register</Button>
      </div>
    </>
  );
}
