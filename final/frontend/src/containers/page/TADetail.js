import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, Dialog, DialogActions, DialogContent, IconButton, makeStyles, TextField, Typography, Snackbar,
} from '@material-ui/core';
import CloudDownloadOutlined from '@material-ui/icons/CloudDownloadOutlined';
import Settings from '@material-ui/icons/Settings';
import moment from 'moment';
import DateTimePicker from '../../components/ui/DateTimePicker';
import LinearProgressBar from '../../components/ui/LinearProgressBar';
import ScoreTable from '../../components/ui/ScoreTable';
import UploadButton from '../../components/ui/UploadButton';
import theme from '../../theme';
import {
  editProblem, downloadStudentScore, browseProblem, readProblemLastSubmission,
} from '../../actions/problem/problem';
import { submitCode } from '../../actions/submission/submission';
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
    paddingLeft: '2.5%',
    paddingRight: '2%',
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
  noSubmissionText: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
}));

const columns = [
  {
    id: 'task',
    label: 'Task',
    align: 'center',
    minWidth: 50,
    width: 100,
  },
  {
    id: 'description',
    label: 'Description',
    align: 'left',
    minWidth: 400,
    width: 800,
  },
  {
    id: 'status',
    label: 'Status',
    align: 'center',
    minWidth: 50,
    width: 100,
  },
];

export default function TADetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { problemId } = useParams();

  const token = localStorage.getItem('auth-token');

  const problems = useSelector((state) => state.problem.byId);
  const problemIds = useSelector((state) => state.problem.allIds);
  const problemLoading = useSelector((state) => state.loading.problem);
  const submission = useSelector((state) => state.submission);
  const submissionLoading = useSelector((state) => state.loading.submission);

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [submitFile, setSubmitFile] = useState(null);

  const [openEditCard, setOpenEditCard] = useState(false);
  const [openSubmitCard, setOpenSubmitCard] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  const [progress, setProgress] = useState(0);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(readProblemLastSubmission(token, problemId));
    setProgress(((submission.total_pass / (submission.total_pass + submission.total_fail)) * 100));
  }, [dispatch, problemId, submission.total_fail, submission.total_pass, token]);

  useEffect(() => {
    if (!problemLoading.editProblem) {
      dispatch(browseProblem(token));
    }
  }, [dispatch, problemLoading.editProblem, token]);

  useEffect(() => {
    if (problems[problemId] !== undefined) {
      setTitle(problems[problemId].title);
      setStartTime(moment(problems[problemId].start_time).format('YYYY-MM-DD HH:mm'));
      setEndTime(moment(problems[problemId].end_time).format('YYYY-MM-DD HH:mm'));
    }
  }, [problemId, problems]);

  useEffect(() => {
    if (!submissionLoading.browseJudgeCase) {
      setTableData(submission.judgecases.map((item) => ({
        task: item.title.split(':')[0],
        description: item.description,
        errorMsg: item.error_message,
        status: item.state,
      })));
    }
  }, [submissionLoading.browseJudgeCase, submission.judgecases]);

  // edit problem
  const handleCloseEditCard = () => {
    setTitle(problems[problemId].title);
    setStartTime(moment(problems[problemId].start_time).format('YYYY-MM-DD HH:mm'));
    setEndTime(moment(problems[problemId].end_time).format('YYYY-MM-DD HH:mm'));
    setUploadFile(null);
    setOpenEditCard(false);
  };
  const handleEditProblem = () => {
    if (title.trim() === '') {
      setShowSnackbar(true);
      setSnackbarText("Title can't be empty");
    } else if (moment(startTime).isAfter(endTime) || moment(startTime).isSame(endTime)) {
      setShowSnackbar(true);
      setSnackbarText('Start time is not before end time');
    } else {
      dispatch(editProblem(token, problemId, title.trim(), startTime, endTime, uploadFile, handleCloseEditCard));
    }
  };
  // submit code
  const handleCloseSubmitCard = () => {
    setSubmitFile(null);
    setOpenSubmitCard(false);
  };
  const handleSubmit = () => {
    if (submitFile !== null) {
      dispatch(submitCode(token, problemId, submitFile, handleCloseSubmitCard));
    }
  };
  // download student score
  const handleDonwloadError = (text) => {
    setShowSnackbar(true);
    setSnackbarText(text);
  };
  const handleDownloadScore = () => {
    dispatch(downloadStudentScore(token, problemId, handleDonwloadError));
  };

  return (
    <>
      <div className={classes.main}>
        <Sidebar />
        <div className={classes.scoreTableGroup}>
          {submission.judgecases.length === 0
            ? (<Typography variant="h4" className={classes.noSubmissionText}>No submission yet.</Typography>)
            : (
              <>
                <ScoreTable data={tableData} columns={columns} />
                <div className={classes.progressBarGroup}>
                  <Typography style={{ marginRight: 10 }} variant="body1">Task Completed</Typography>
                  <LinearProgressBar value={progress} />
                </div>
              </>
            )}
        </div>
        {problemIds.length !== 0 && (
        <div className={classes.rightSidebar}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <div className={classes.hackAndIcon}>
              <Typography variant="h4">{title}</Typography>
              {moment(moment().toDate()).isBefore(startTime) && (
              <IconButton onClick={() => setOpenEditCard(true)}>
                <Settings htmlColor={theme.palette.grey[300]} />
              </IconButton>
              )}
            </div>
            <Typography style={{ marginTop: 15 }} variant="body1">Start Time</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">{startTime}</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">End Time</Typography>
            <Typography style={{ marginTop: 5 }} variant="body1">{endTime}</Typography>

            {moment(moment().toDate()).isAfter(endTime) && (
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
        )}
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
            <TextField id="outlined-required" value={title} onChange={(e) => setTitle(e.target.value)} />
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
              selectedDate={endTime}
              setSelectedDate={setEndTime}
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
          <div className={classes.dialogContent} style={{ marginTop: 0 }}>
            <Typography variant="h4">Submit Code</Typography>
          </div>
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <Typography style={{ marginRight: 30 }} variant="body1">Select file (.zip)</Typography>
            <UploadButton setUpLoadFile={setSubmitFile} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" style={{ borderRadius: 10 }} onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message={snackbarText}
      />
    </>
  );
}
