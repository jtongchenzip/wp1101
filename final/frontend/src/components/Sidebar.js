import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Avatar, Typography, Button, Dialog, DialogContent, TextField, makeStyles,
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

  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);
  const problems = useSelector((state) => state.problem);
  const loading = useSelector((state) => state.loading.problem);

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(moment().toDate());
  const [endTime, setEndTime] = useState(moment().toDate());
  const [uploadFile, setUploadFile] = useState(null);
  const [openAddCard, setAddCardOpen] = useState(false);

  useEffect(() => {
    if (!loading.addProblem) {
      dispatch(browseProblem(token));
    }
  }, [dispatch, token, loading.addProblem]);

  const handleAddProblem = () => {
    if (title !== '' && moment(startTime).isBefore(endTime) && uploadFile !== null) {
      dispatch(addProblem(token, title, startTime, endTime, uploadFile, history));
    }
  };
  const handleCloseAddCard = () => {
    setTitle('');
    setStartTime(moment().toDate());
    setEndTime(moment().toDate());
    setUploadFile(null);
    setAddCardOpen(false);
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
            height: 26, width: 84, fontSize: 14, color: theme.palette.grey[300], backgroundColor: theme.palette.grey.A400,
          }}
        >
          {user.role}
        </Button>
        <Button variant="outlined" color="primary" style={{ marginTop: 30 }} onClick={() => setAddCardOpen(true)}>Add</Button>
        {problems.length !== 0 && problems.map((problem) => (
          <Button variant="text" style={{ marginTop: 15 }} key={problem.id}>{problem.title}</Button>
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

    </>
  );
}
