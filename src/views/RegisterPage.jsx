import React from 'react';
import Paper from '@material-ui/core/Paper';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import s from '../App.module.css';

const Register = () => {
  return (
    <Paper elevation={3} className={s.reg__container}>
      <RegisterForm />
    </Paper>
  );
};

export default Register;
