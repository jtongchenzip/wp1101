import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Avatar, Typography, Button, Dialog, DialogContent, TextField, makeStyles, Snackbar,
} from '@material-ui/core';
import moment from 'moment';
import DateTimePicker from './ui/DateTimePicker';
import UploadButton from './ui/UploadButton';
import theme from '../theme';
import ric from '../asset/ric.png';
import { browseProblem, addProblem } from '../actions/problem/problem';

const useStyles = makeStyles(() => ({
  leftSidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '15%',
  },
  dialogContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const token = localStorage.getItem('auth-token');

  const user = useSelector((state) => state.user);

  const problems = useSelector((state) => state.problem.byId);
  const problemIds = useSelector((state) => state.problem.allIds);
  const loading = useSelector((state) => state.loading.problem);

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(moment().toDate());
  const [endTime, setEndTime] = useState(moment().toDate());
  const [uploadFile, setUploadFile] = useState(null);
  const [openAddCard, setAddCardOpen] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  useEffect(() => {
    if (!loading.addProblem) {
      dispatch(browseProblem(token));
    }
  }, [dispatch, token, loading.addProblem]);

  const handleAddProblem = () => {
    if (title.trim() === '') {
      setShowSnackbar(true);
      setSnackbarText("Title can't be empty");
    } else if (moment(startTime).isAfter(endTime) || moment(startTime).isSame(endTime)) {
      setShowSnackbar(true);
      setSnackbarText('Start time is not before end time');
    } else if (uploadFile === null) {
      setShowSnackbar(true);
      setSnackbarText("Upload file can't be empty");
    } else {
      dispatch(addProblem(token, title.trim(), startTime, endTime, uploadFile, history));
    }
  };
  const handleCloseAddCard = () => {
    setTitle('');
    setStartTime(moment().toDate());
    setEndTime(moment().toDate());
    setUploadFile(null);
    setAddCardOpen(false);
  };

  const handleProblemBtnClick = (problemId) => {
    if (user.role === 'TA') {
      history.push(`/ta/problem/${problemId}`);
    } else if (user.role === 'STUDENT') {
      history.push(`/student/problem/${problemId}`);
    }
  };

  return (
    <>
      <div className={classes.leftSidebar}>
        <Avatar alt="Head shot" style={{ height: '70px', width: '70px' }} src={ric} />
        <Typography color="primary" style={{ marginTop: 10 }} variant="h4">{user.username}</Typography>
        <Button
          variant="contained"
          disabled
          style={{
            height: 26, width: 85, fontSize: 14, color: theme.palette.grey[300], backgroundColor: theme.palette.grey.A400,
          }}
        >
          {user.role}
        </Button>
        {user.role === 'TA' && (<Button variant="outlined" color="primary" style={{ marginTop: 30 }} onClick={() => setAddCardOpen(true)}>Add</Button>)}
        {problemIds.length !== 0 && problemIds.map((id) => (
          <Button
            variant="text"
            style={{ marginTop: 15 }}
            key={id}
            onClick={() => handleProblemBtnClick(id)}
          >
            {problems[id].title}

          </Button>
        ))}
      </div>

      <Dialog
        open={openAddCard}
        onClose={handleCloseAddCard}
        maxWidth="md"
      >
        <DialogContent>
          <div className={classes.dialogContent} style={{ marginTop: 0 }}>
            <Typography variant="h4">Add Problem</Typography>
          </div>
          <div className={classes.dialogContent} style={{ marginTop: 25 }}>
            <Typography variant="body1">Title</Typography>
            <TextField onChange={(e) => setTitle(e.target.value)} />
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
          <div className={classes.dialogContent} style={{ justifyContent: 'flex-end', marginTop: 0 }}>
            <Button color="primary" style={{ borderRadius: 10 }} onClick={handleAddProblem}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message={snackbarText}
      />
    </>
  );
}
