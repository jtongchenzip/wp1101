import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Box,
} from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToAppRounded';
import { logout } from '../../actions/user/auth';

// 看他是否登入，判斷要不要給 logout icon
export default function Header({ title }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.clear();
    console.log('localStorage cleared');
    dispatch(logout(history));
  };

  return (
    <Box>
      <AppBar position="static" color="inherit" style={{ minHeight: '64px' }}>
        <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center', margin: '5px 12px' }}>
          <Typography variant="h4">{title}</Typography>
          {user.isAuthenticated && (
          <IconButton size="medium" edge="end" aria-label="menu" onClick={handleLogout}>
            <div style={{ marginRight: 20, cursor: 'default' }}>
              <Typography variant="h4">{user.student_id}</Typography>
            </div>
            <LogoutIcon />
          </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
