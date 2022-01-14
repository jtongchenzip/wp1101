import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';

// set accept file type
export default function UploadButtons({ uploadFile, setUpLoadFile }) {
  const [fileName, setFileName] = useState(uploadFile);

  const handleUploadFile = (file) => {
    const newFile = Object.keys(file).map((key) => file[key]);
    setUpLoadFile(newFile);
    setFileName(file[0].name);
    console.log(newFile);
  };

  return (
    <>
      <label htmlFor="upload-file">
        <input
          style={{ display: 'none' }}
          id="upload-file"
          type="file"
          accept=".zip"
          onChange={(e) => handleUploadFile(e.target.files)}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" component="span" style={{ borderRadius: 15 }}>
            Browse
          </Button>
          <Typography variant="body1" style={{ marginLeft: '20px' }}>
            {fileName}
          </Typography>
        </div>
      </label>
    </>
  );
}
