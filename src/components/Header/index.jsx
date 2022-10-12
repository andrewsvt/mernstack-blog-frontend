import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Logo from '../../assets/Logo.svg';

export const Header = () => {
  const isAuth = false;

  const onClickLogout = () => {};

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
                <Link to="/post/create">
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
