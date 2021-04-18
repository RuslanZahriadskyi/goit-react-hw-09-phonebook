import React from 'react';
import Paper from '@material-ui/core/Paper';
import s from '../App.module.css';

const HomePage = () => {
  return (
    <Paper elevation={3}>
      <h1 className={s.main__title}>Welcome to you Phonebook</h1>
    </Paper>
  );
};

export default HomePage;
