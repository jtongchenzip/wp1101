import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, Dialog, DialogActions, DialogContent, IconButton, makeStyles, TextField, Typography,
} from '@material-ui/core';
import CloudDownloadOutlined from '@material-ui/icons/CloudDownloadOutlined';
import Settings from '@material-ui/icons/Settings';
import moment from 'moment';
import DateTimePicker from '../../components/ui/DateTimePicker';
import LinearProgressBar from '../../components/ui/LinearProgressBar';
import ScoreTable from '../../components/ui/ScoreTable';
import UploadButton from '../../components/ui/UploadButton';
import theme from '../../theme';
import { readProblem, editProblem, downloadStudentScore } from '../../actions/problem/problem';
import { submitCode, browseJudgeCase } from '../../actions/submission/submission';
import Sidebar from '../../components/Sidebar';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    alignItems: 'stretch',
    marginTop: 30,
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
    paddingLeft: '3%',
    // paddingRight: '2%',
  },
  hackAndIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stuAndIcon: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  dialogContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export default function TADetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { problemId } = useParams();

  const token = useSelector((state) => state.user.token);
  const problems = useSelector((state) => state.problem.byId);
  const submission = useSelector((state) => state.submission);

  const [title, setTitle] = useState(problems ? problems.title : '');
  const [startTime, setStartTime] = useState(problems ? problems.start_time : '');
  const [endTime, setEndTime] = useState(problems ? problems.start_end : '');
  const [uploadFile, setUploadFile] = useState(null);
  const [submitFile, setSubmitFile] = useState(null);

  const [openEditCard, setEditCardOpen] = useState(false);
  const [openSubmitCard, setOpenSubmitCard] = useState(false);

  const [progress, setProgress] = useState(60);

  useEffect(() => {
    dispatch(readProblem(token, problemId));
  }, [dispatch, problemId, token]);

  const handleCloseEditCard = () => {
    setTitle('');
    setStartTime(moment().toDate());
    setEndTime(moment().toDate());
    setUploadFile(null);
  };
  const handleEditProblem = () => {
    if (title !== '' && moment(startTime).isBefore(endTime)) {
      dispatch(editProblem(token, problemId, title, startTime, endTime, uploadFile, handleCloseEditCard));
    }
  };

  const handleCloseSubmitCard = () => {
    setSubmitFile(null);
    setOpenSubmitCard(false);
  };
  const handleSubmit = () => {
    if (submitFile !== null) {
      dispatch(submitCode(token, problemId, submitFile, handleCloseSubmitCard));
    }
  };

  const handleDownloadScore = () => {
    dispatch(downloadStudentScore(token, problemId));
  };

  return (
    <>
      <div className={classes.main}>
        <Sidebar />
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
              <Typography style={{ marginRight: 5 }} variant="h4">{problems[problemId].title}</Typography>
              <IconButton onClick={() => setEditCardOpen(true)}>
                <Settings htmlColor={theme.palette.grey[300]} />
              </IconButton>
            </div>
            <Typography style={{ marginTop: 15 }} variant="body1">Start Time</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">{problems[problemId].start_time}</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">End Time</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">{problems[problemId].end_time}</Typography>

            {moment(moment().toDate()).isAfter(problems[problemId].end_time) && (
            <div className={classes.stuAndIcon}>
              <Typography style={{ marginRight: 10 }} variant="body1">Student Score</Typography>
              <IconButton onClick={handleDownloadScore}>
                <CloudDownloadOutlined htmlColor={theme.palette.grey[300]} />
              </IconButton>
            </div>
            )}
          </div>
          {/* TA can submit whenever the problem is created */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button color="primary" variant="contained" onClick={() => setOpenSubmitCard(true)}>Submit</Button>
          </div>
        </div>
      </div>

      {/* edit problem */}
      <Dialog
        open={openEditCard}
        onClose={handleCloseEditCard}
        maxWidth="md"
      >
        <DialogContent>
          <div className={classes.dialogContent} style={{ marginTop: 0 }}>
            <Typography variant="h4">Edit Problem</Typography>
          </div>
          <div className={classes.dialogContent} style={{ marginTop: 15 }}>
            <Typography variant="body1">Title</Typography>
            <TextField id="outlined-required" label="Title" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={classes.dialogContent} style={{ marginTop: 15 }}>
            <Typography variant="body1">Start Time</Typography>
            <DateTimePicker
              selectedDate={startTime}
              setSelectedDate={setStartTime}
            />
          </div>
          <div className={classes.dialogContent} style={{ marginTop: 15 }}>
            <Typography variant="body1">End Time</Typography>
            <DateTimePicker
              selectedDate={startTime}
              setSelectedDate={setStartTime}
            />
          </div>
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <Typography style={{ marginRight: 76 }} variant="body1">Problem file</Typography>
            <UploadButton setUpLoadFile={setUploadFile} />
          </div>
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-end', marginTop: 0, borderRadius: 10 }}>
            <Button color="primary" style={{ borderRadius: 10 }} onClick={handleEditProblem}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* submit */}
      <Dialog
        open={openSubmitCard}
        onClose={handleCloseSubmitCard}
        maxWidth="md"
      >
        <DialogContent>
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <Typography style={{ marginRight: 30 }} variant="body1">Select file (.zip)</Typography>
            <UploadButton setUpLoadFile={setSubmitFile} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" style={{ borderRadius: 10 }} onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
