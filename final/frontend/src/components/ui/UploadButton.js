import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';

// set accept file type
export default function UploadButtons({ setUpLoadFile }) {
  const [fileName, setFileName] = useState('');

  const handleUploadFile = (file) => {
    const newFile = Object.keys(file).map((key) => file[key]);
    setUpLoadFile(newFile);
    setFileName(file[0].name);
    console.log(newFile);
  };

  // <label htmlFor="upload-file">
  //   <input
  //     style={{ display: 'none' }}
  //     id="upload-file"
  //     name="upload-file"
  //     type="file"
  //     accept={fileAcceptFormat}
  //     onChange={(e) => handleUploadFile(e)}
  //     multiple={multipleFiles}
  //   />
  //   <Button
  //     className={classes.browseButton}
  //     variant="outlined"
  //     color="primary"
  //     component="span"
  //     startIcon={<Icon.Folder />}
  //   >
  //     Browse
  //   </Button>
  // </label>;

  return (
    <>
      <label htmlFor="upload-file">
        <input
          style={{ display: 'none' }}
          id="upload-file"
          type="file"
          accept="zip/*"
          onChange={(e) => handleUploadFile(e.target.files)}
        />
        <div>
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
