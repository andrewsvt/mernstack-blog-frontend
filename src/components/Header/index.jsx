import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { AuthSelector, logout } from '../../redux/slices/authSlice';

import styles from './Header.module.scss';
import { Container, IconButton } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';

import Logo from '../../assets/Logo.svg';

export const Header = () => {
  const dispatch = useDispatch();
  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      window.localStorage.removeItem('userToken');
    }
  };

  const isAuth = useSelector(AuthSelector);

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <img src={Logo} alt="Mern blog" />
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <IconButton color="primary" aria-label="Write a story" size="large">
                    <DriveFileRenameOutlineIcon fontSize="inherit" />
                  </IconButton>
                </Link>
                <IconButton onClick={onClickLogout} color="dark" aria-label="Log Out" size="large">
                  <LogoutIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="Account" size="large">
                  <PersonIcon color="secondary" fontSize="inherit" />
                </IconButton>
              </>
            ) : (
              <>
                <Link to="/login">
                  <IconButton aria-label="Log In" size="large">
                    <LoginIcon color="primary" fontSize="inherit" />
                  </IconButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
