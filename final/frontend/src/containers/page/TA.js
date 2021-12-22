import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar, Button, Typography, makeStyles,
} from '@material-ui/core';
import { DownloadIcon } from '@material-ui/icons/Download';
import ScoreTable from '../../components/ui/ScoreTable';
import LinearProgressBar from '../../components/ui/LinearProgressBar';

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
    alignItems: 'center',
    width: '15%',
  },
}));

export default function TA() {
  const [progress, setProgress] = useState(60);
  const classes = useStyles();

  return (
    <>
      <div className={classes.main}>
        <div className={classes.leftSidebar}>
          <Avatar alt="Pdogs" style={{ height: '60px', width: '60px' }} src="/static/images/avatar.jpg" />
          <Typography color="primary" style={{ marginTop: 10 }} variant="h6">pdogs</Typography>
          <Button type="text" variant="contained" disabled size="small" style={{ height: 25 }}>TA</Button>
          <Button variant="outlined" style={{ marginTop: 20 }}>Hack 1</Button>
          <Button variant="outlined" style={{ marginTop: 10 }}>Hack 2</Button>
          <Button variant="outlined" style={{ marginTop: 10 }}>Hack 3</Button>
          <Button color="primary" variant="outlined" style={{ marginTop: 10 }}>Add</Button>
        </div>
        <div className={classes.scoreTableGroup}>
          <ScoreTable />
          <div className={classes.progressBarGroup}>
            <Typography style={{ marginRight: 10 }} variant="body1">Task Completed</Typography>
            <LinearProgressBar value={progress} />
          </div>
        </div>
        <div className={classes.rightSidebar}>
          <Typography variant="h4">Hackathon 1</Typography>
          <Typography style={{ marginTop: 15 }} variant="h6">Date : 2022/01/01</Typography>
          <Typography style={{ marginTop: 5 }} variant="h6">Start Time : 09 : 10</Typography>
          <Typography style={{ marginTop: 5 }} variant="h6">End Time : 12 : 10</Typography>
          <Typography style={{ marginTop: 10 }} variant="h6">Student Score</Typography>
          <DownloadIcon />
          <Button color="primary" variant="contained" style={{ marginTop: 15 }}>Submit</Button>
        </div>
      </div>
    </>
  );
}
