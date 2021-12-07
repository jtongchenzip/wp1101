import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

export default function Login() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '50px 100px',
      }}
    >
      <Typography variant="h3" color="initial">
        This is Login page.
      </Typography>
      <Link to="/ui-components">
        <Button>UI Component Usage</Button>
      </Link>
    </div>
  );
}
