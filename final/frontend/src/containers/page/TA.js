import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar, Button, Typography, makeStyles,
} from '@material-ui/core';
import CloudDownloadOutlined from '@material-ui/icons/CloudDownloadOutlined';
import Settings from '@material-ui/icons/Settings';
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
    width: '15%',
    paddingLeft: 30,
  },
  hackAndIcon: {
    display: 'flex',
  },
  stuAndIcon: {
    display: 'flex',
    marginTop: 30,
    marginBottom: 30,
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
          {/* hack buttions need to change color to white */}
          <Button color="primary" style={{ marginTop: 20 }} variant="text">Hack 1</Button>
          <Button color="primary" style={{ marginTop: 10 }} variant="text">Hack 2</Button>
          <Button color="primary" style={{ marginTop: 10 }} variant="text">Hack 3</Button>
          <Button color="primary" style={{ marginTop: 10 }} variant="outlined">Add</Button>
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
              <Settings htmlColor="grey" />
            </div>
            <Typography style={{ marginTop: 15 }} variant="body1">Date : 2022/01/01</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">Start Time : 09 : 10</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">End Time : 12 : 10</Typography>
            <div className={classes.stuAndIcon}>
              <Typography style={{ marginRight: 10 }} variant="body1">Student Score</Typography>
              <CloudDownloadOutlined htmlColor="grey" />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button color="primary" variant="contained">Submit</Button>
          </div>
        </div>
      </div>
    </>
  );
}
