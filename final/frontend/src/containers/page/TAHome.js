import React from 'react';
import { makeStyles } from '@material-ui/core';
import Sidebar from '../../components/Sidebar';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignItems: 'stretch',
    marginTop: 30,
  },
}));

export default function TAHome() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.main}>
        <Sidebar />
        <p>hello</p>
      </div>
    </>
  );
}
