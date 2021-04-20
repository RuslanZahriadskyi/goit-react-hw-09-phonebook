import React from 'react';
import Paper from '@material-ui/core/Paper';
import LoginForm from '../components/LoginForm';
import s from '../App.module.css';

const LoginPage = () => {
  return (
    <Paper elevation={3} className={s.login__container}>
      <LoginForm />
    </Paper>
  );
};

export default LoginPage;
