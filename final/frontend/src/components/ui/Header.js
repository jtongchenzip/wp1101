import React, { useSelector } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box,
} from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToAppRounded';

// 看他是否登入，判斷要不要給 logout icon
export default function Header({ title }) {
  // const user = useSelector((state) => state.user);
  const student_id = 'B00000000';

  return (
    <Box>
      <AppBar position="static" color="inherit" style={{ minHeight: '64px' }}>
        <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center', margin: '5px 12px' }}>
          <Typography variant="h4">{title}</Typography>
          <IconButton size="medium" edge="end" aria-label="menu">
            <div style={{ marginRight: 20, cursor: 'default' }}>
              <Typography variant="h4">{student_id}</Typography>
            </div>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
