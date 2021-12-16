import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Typography } from '@material-ui/core';
import Header from '../../components/ui/Header';
import ScoreTable from '../../components/ui/ScoreTable';
import LinearProgressBar from '../../components/ui/LinearProgressBar';

export default function Student() {
  const [progress, setProgress] = useState(60);
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
          left: '5%',
          top: '20%',
          transform: 'translate(-15%, -15%)',
        }}
      >
        <Avatar alt="Pdogs" style={{ height: '60px', width: '60px' }} src="/static/images/avatar.jpg" />
        <Typography color="primary" style={{ marginTop: 10 }} variant="h6">pdogs</Typography>
        <Typography color="primary" style={{ marginTop: 5 }} variant="h7">student</Typography>
        <Button color="body1" variant="outlined" style={{ marginTop: 50 }}>Hack 1</Button>
        <Button color="body1" variant="outlined" style={{ marginTop: 15 }}>Hack 2</Button>
        <Button color="body1" variant="outlined" style={{ marginTop: 15 }}>Hack 3</Button>
      </div>
      <div style={{ 'margin-left': 220, 'margin-top': 60 }}>
        <ScoreTable />
        <div style={{ 'margin-left': 550, 'margin-top': 20 }}>
          <Typography variant="body1">Task Completed</Typography>
          <LinearProgressBar value={progress} />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'left',
          position: 'absolute',
          left: '85%',
          top: '20%',
          transform: 'translate(15%, -15%)',
        }}
      >
        <Typography variant="h4">Hackathon 1</Typography>
        <Typography style={{ marginTop: 15 }} variant="h6">Date : 2022/01/01</Typography>
        <Typography style={{ marginTop: 5 }} variant="h6">Start Time : 09 : 10</Typography>
        <Typography style={{ marginTop: 5 }} variant="h6">End Time : 12 : 10</Typography>
        <Button color="primary" variant="contained" style={{ marginTop: 15 }}>Submit</Button>
      </div>
    </>
  );
}
