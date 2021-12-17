import * as React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box,
} from '@material-ui/core';
// import LogoutIcon from '@material-ui/icons/ExitToAppRounded';

export default function ButtonAppBar({ title }) {
  return (
    <Box>
      <AppBar position="static" color="inherit" style={{ height: '64px' }}>
        <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center', margin: '0 12px' }}>
          <Typography variant="h4">{title}</Typography>
          {/* <IconButton size="medium" edge="end" aria-label="menu">
            <LogoutIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
