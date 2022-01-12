import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar, Button, Typography, makeStyles,
} from '@material-ui/core';
import ScoreTable from '../../components/ui/ScoreTable';
import LinearProgressBar from '../../components/ui/LinearProgressBar';
import theme from '../../theme';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignItems: 'stretch',
    marginTop: 50,
  },
  leftSidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '15%',
  },
  scoreTableGroup: {
    width: '70%',
  },
  progressBarGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  rightSidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: '15%',
    paddingLeft: 40,
    paddingRight: 15,
  },
}));

export default function Student() {
  const [progress, setProgress] = useState(60);
  const classes = useStyles();

  return (
    <>
      <div className={classes.main}>
        <div className={classes.leftSidebar}>
          <Avatar alt="Pdogs" style={{ height: '64px', width: '64px' }} src="/static/images/avatar.jpg" />
          <Typography color="primary" style={{ marginTop: 10 }} variant="h4">pdogs</Typography>
          <Button
            variant="contained"
            disabled
            style={{
              height: 26, width: 84, fontSize: 14, color: theme.palette.grey[300], backgroundColor: theme.palette.grey.A400,
            }}
          >
            student
          </Button>
          <Button variant="initial" style={{ marginTop: 20 }}>Hack 1</Button>
          <Button variant="initial" style={{ marginTop: 10 }}>Hack 2</Button>
          <Button variant="initial" style={{ marginTop: 10 }}>Hack 3</Button>
          <Button variant="outlined" color="primary">Add</Button>
        </div>
        <div className={classes.scoreTableGroup}>
          <ScoreTable />
          <div className={classes.progressBarGroup}>
            <Typography style={{ marginRight: 10 }} variant="body1">Task Completed</Typography>
            <LinearProgressBar value={progress} />
          </div>
        </div>
        <div className={classes.rightSidebar}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <div className={classes.hackAndIcon}>
              <Typography style={{ marginRight: 10 }} variant="h4">Hackathon 1</Typography>
            </div>
            <Typography style={{ marginTop: 15 }} variant="body1">Date : 2022/01/01</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">Start Time : 09 : 10</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">End Time : 12 : 10</Typography>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 20,
          }}
          >
            <Button color="primary" variant="contained">Submit</Button>
          </div>
        </div>
      </div>
    </>
  );
}
