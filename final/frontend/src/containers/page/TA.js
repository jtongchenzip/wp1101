import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, TextField, Typography,
} from '@material-ui/core';
import CloudDownloadOutlined from '@material-ui/icons/CloudDownloadOutlined';
import Settings from '@material-ui/icons/Settings';

import theme from '../../theme';
import DateTimePicker from '../../components/ui/DateTimePicker';
import LinearProgressBar from '../../components/ui/LinearProgressBar';
import ScoreTable from '../../components/ui/ScoreTable';
import UploadButton from '../../components/ui/UploadButton';

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
  hackAndIcon: {
    display: 'flex',
  },
  stuAndIcon: {
    display: 'flex',
    marginTop: 30,
    marginBottom: 30,
  },
  dialogContent: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
}));

export default function TA() {
  const [openAddCard, setAddCardOpen] = useState(false);
  const [openEditCard, setEditCardOpen] = useState(false);
  const [progress, setProgress] = useState(60);
  const [uploadFile, setUpLoadFile] = useState([]);
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
            TA
          </Button>
          <Button variant="initial">Hack 1</Button>
          <Button variant="initial">Hack 2</Button>
          <Button variant="initial">Hack 3</Button>
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
              <IconButton onClick={() => setEditCardOpen(true)}>
                <Settings htmlColor={theme.palette.grey[300]} />
              </IconButton>
            </div>
            <Typography style={{ marginTop: 15 }} variant="body1">Date : 2022/01/01</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">Start Time : 09 : 10</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">End Time : 12 : 10</Typography>
            <div className={classes.stuAndIcon}>
              <Typography style={{ marginRight: 10 }} variant="body1">Student Score</Typography>
              <CloudDownloadOutlined htmlColor={theme.palette.grey[300]} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button color="primary" variant="contained">Submit</Button>
          </div>
        </div>
      </div>
      <Dialog
        open={openAddCard}
        onClose={() => setAddCardOpen(false)}
        maxWidth="md"
      >
        <DialogContent>
          <div className={classes.dialogContent} style={{ marginTop: 0 }}>
            <Typography variant="body1">Title</Typography>
            <TextField id="outlined-required" label="Title" />
          </div>
          <div className={classes.dialogContent} style={{ marginTop: 20 }}>
            <Typography variant="body1">Start Time</Typography>
            <DateTimePicker />
          </div>
          <div className={classes.dialogContent} style={{ marginTop: 20 }}>
            <Typography variant="body1">End Time</Typography>
            <DateTimePicker />
          </div>
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <Typography style={{ marginRight: 90 }} variant="body1">Problem file</Typography>
            <UploadButton setUpLoadFile={setUpLoadFile} />
          </div>
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-end', marginTop: 0 }}>
            <Button color="primary" variant="contained">Add</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openEditCard}
        onClose={() => setEditCardOpen(false)}
        maxWidth="md"
      >
        <DialogContent>
          <div className={classes.dialogContent} style={{ marginTop: 0 }}>
            <Typography variant="body1">Title</Typography>
            <TextField id="outlined-required" label="Title" />
          </div>
          <div className={classes.dialogContent} style={{ marginTop: 20 }}>
            <Typography variant="body1">Start Time</Typography>
            <DateTimePicker />
          </div>
          <div className={classes.dialogContent} style={{ marginTop: 20 }}>
            <Typography variant="body1">End Time</Typography>
            <DateTimePicker />
          </div>
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <Typography style={{ marginRight: 90 }} variant="body1">Problem file</Typography>
            <UploadButton setUpLoadFile={setUpLoadFile} />
          </div>
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-end', marginTop: 0 }}>
            <Button color="primary" variant="contained">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
