import React from 'react';
import { Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { AuthSelector, fetchLoginData } from '../../redux/slices/authSlice';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';

export const Login = () => {
  const isAuth = useSelector(AuthSelector); //user is authorized or not

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'andreycome03@gmail.com',
      password: '123456',
    },
    criteriaMode: 'onChange',
    shouldFocusError: true,
  });

  React.useEffect(() => {
    setError('password', {
      types: {
        minLength: 'Must be at least',
      },
    });
    console.log('errors seted');
  }, [setError]);

  const onSubmit = async (data) => {
    const userData = await dispatch(fetchLoginData(data));

    if (!userData.payload) {
      return alert('Unable to log in');
    } else if ('token' in userData.payload) {
      window.localStorage.setItem('userToken', userData.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper
      classes={{ root: styles.root }}
      sx={{
        borderRadius: '12px',
      }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Welcome back.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register('email', { required: true })}
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
          {...register('password', { required: true })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Log In
        </Button>
      </form>
    </Paper>
  );
};
