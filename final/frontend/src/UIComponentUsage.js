import React, { useState } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import LinearProgressBar from './components/ui/LinearProgressBar';
import ScoreTable from './components/ui/ScoreTable';
import Header from './components/ui/Header';
import UploadButton from './components/ui/UploadButton';
import DateTimePicker from './components/ui/DateTimePicker';

export default function App() {
  const [progress, setProgress] = useState(80);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [uploadFile, setUpLoadFile] = useState([]);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  return (
    <>
      <Header title="Hackthon Online Judge System" />
      <Typography style={{ marginTop: 50 }} color="primary" variant="h3">
        Primary h3
      </Typography>
      <Typography color="secondary" variant="h4">
        Secondary h4
      </Typography>
      <Typography color="error" variant="h6">
        Error h6
      </Typography>
      <Typography variant="body1">default body1</Typography>
      <Button color="primary" variant="contained">
        Button
      </Button>
      <Button color="primary" variant="contained" style={{ borderRadius: '15px' }}>
        15px
      </Button>
      <UploadButton setUpLoadFile={setUpLoadFile} />
      <TextField hiddenLabel id="outlined-required" label="Username" variant="outlined" />
      <TextField hiddenLabel id="outlined-required" label="Password" variant="outlined" />
      <DateTimePicker value={selectedDate} setValue={handleDateChange} />
      <LinearProgressBar value={progress} />
      <ScoreTable />
    </>
  );
}
