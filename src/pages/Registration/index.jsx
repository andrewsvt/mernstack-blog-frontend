import React from 'react';
import { Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { AuthSelector, fetchRegisterData } from '../../redux/slices/authSlice';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './Login.module.scss';

const schema = yup.object({
  fullName: yup.string().required('Required field').min(3, 'How can a name be so short?'),
  email: yup.string().required('Required field').email("It doesn't seem to be an email..."),
  password: yup
    .string()
    .required('Required field')
    .min(6, 'Password must be at least 6 characters'),
});

export const Registration = () => {
  const isAuth = useSelector(AuthSelector); //user is authorized or not

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    criteriaMode: 'firstError',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const userData = await dispatch(fetchRegisterData(data));

    if (!userData.payload) {
      return alert('Unable to sign up');
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
        Join us.
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Full name"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          fullWidth
          {...register('fullName', { required: 'Enter full name' })}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register('email', { required: 'Enter email' })}
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
          {...register('password', { required: 'Enter password' })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Sing Up
        </Button>
      </form>
    </Paper>
  );
};
