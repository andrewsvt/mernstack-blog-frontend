import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { AuthSelector, logout } from '../../redux/slices/authSlice';

import styles from './Header.module.scss';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

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
                  <Button variant="contained">Write a story</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
