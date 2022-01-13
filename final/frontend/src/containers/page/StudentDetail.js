import React, { useState } from 'react';
import {
  Avatar, Button, Dialog, DialogActions, DialogContent, makeStyles, TextField, Typography,
} from '@material-ui/core';

import theme from '../../theme';
import DateTimePicker from '../../components/ui/DateTimePicker';
import LinearProgressBar from '../../components/ui/LinearProgressBar';
import ScoreTable from '../../components/ui/ScoreTable';
import UploadButton from '../../components/ui/UploadButton';
import ric from '../../asset/ric.png';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignItems: 'stretch',
    marginTop: 30,
  },
  leftSidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '15%',
  },
  scoreTableGroup: {
    width: '70%',
    marginTop: 52,
  },
  progressBarGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  rightSidebar: {
    display: 'flex',
    flexDirection: 'column',
    // width: '15%',
    width: 'fit-content',
    paddingLeft: 30,
    paddingRight: 15,
  },
  dialogContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export default function Student() {
  const [openSubmitCard, setOpenSubmitCard] = useState(false);
  const [openEditCard, setEditCardOpen] = useState(false);
  const [progress, setProgress] = useState(60);
  const [uploadFile, setUpLoadFile] = useState([]);
  const classes = useStyles();

  return (
    <>
      <div className={classes.main}>
        <div className={classes.leftSidebar}>
          <Avatar alt="Pdogs" style={{ height: '70px', width: '70px' }} src={ric} />
          <Typography color="primary" style={{ marginTop: 10 }} variant="h4">pdogsss</Typography>
          <Button
            variant="contained"
            disabled
            style={{
              height: 26, width: 84, fontSize: 14, color: theme.palette.grey[300], backgroundColor: theme.palette.grey.A400,
            }}
          >
            Student
          </Button>
          <Button variant="initial" style={{ marginTop: 20 }}>Hack 1</Button>
          <Button variant="initial" style={{ marginTop: 10 }}>Hack 2</Button>
          <Button variant="initial" style={{ marginTop: 10 }}>Hack 3</Button>
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
              <Typography variant="h4">Hackathon 1</Typography>
            </div>
            <Typography style={{ marginTop: 15 }} variant="body1">Date : 2022/01/01</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">Start Time : 09 : 10</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">End Time : 12 : 10</Typography>
          </div>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 35,
          }}
          >
            <Button color="primary" variant="contained" onClick={() => setOpenSubmitCard(true)}>Submit</Button>
          </div>
        </div>
      </div>

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
            <Typography style={{ marginRight: 76 }} variant="body1">Problem file</Typography>
            <UploadButton setUpLoadFile={setUpLoadFile} />
          </div>
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-end', marginTop: 0 }}>
            <Button color="primary" variant="contained">Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openSubmitCard}
        onClose={() => setOpenSubmitCard(false)}
        maxWidth="md"
      >
        <DialogContent>
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <Typography style={{ marginRight: 76 }} variant="body1">Select file</Typography>
            <UploadButton setUpLoadFile={setUpLoadFile} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" style={{ borderRadius: 10 }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
