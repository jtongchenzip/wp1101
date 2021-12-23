import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Button, Typography, TextField, makeStyles,
} from '@material-ui/core';
import '../../App.css';
import { signUp } from '../../actions/user/auth';

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
  const [studentId, setStudentId] = useState('');
  const [realName, setRealName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasRequest, setHasRequest] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleRegister = async () => {
    await dispatch(signUp(username, password, realName, studentId));
    setHasRequest(true);
  };
  useEffect(() => {
    if (hasRequest) {
      history.push('/login');
    }
  }, [hasRequest, history]);
  return (
    <>
      <div className={classes.main}>
        <TextField id="outlined-required" className={classes.registerForm} label="Student ID" onChange={(e) => setStudentId(e.target.value.trim())} />
        <TextField id="outlined-required" className={classes.registerForm} label="Real Name" onChange={(e) => setRealName(e.target.value.trim())} />
        <TextField id="outlined-required" className={classes.registerForm} label="Username" onChange={(e) => setUsername(e.target.value.trim())} />
        <TextField id="outlined-required" className={classes.registerForm} label="Password" onChange={(e) => setPassword(e.target.value)} />
        <Button color="primary" variant="contained" onClick={handleRegister}>Register</Button>
      </div>
    </>
  );
}
