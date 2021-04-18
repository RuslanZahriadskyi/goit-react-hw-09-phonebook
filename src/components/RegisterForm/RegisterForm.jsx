import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';

import s from './RegisterForm.module.css';

import InputAdornment from '@material-ui/core/InputAdornment';
import NameIcon from '@material-ui/icons/SupervisorAccount';
import EmailIcon from '@material-ui/icons/Email';
import ShowHidePassword from '../ShowHidePassword';

import { authOperations } from '../../redux/auth';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .min(1, 'Name should be of minimum 1 characters length')
    .max(25, 'Name should be of max 25 characters length')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Enter your password')
    .required('Confirm your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .oneOf([yup.ref('password')], 'Password does not match'),
});

export default function RegisterForm() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onFormSubmit(values, resetForm);
    },
  });

  function onFormSubmit(values, resetForm) {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    dispatch(authOperations.registerNewUser(newUser));
    resetForm();
  }

  function isValid() {
    if (formik.values.name === '') {
      return false;
    }
    if (formik.values.email === '') {
      return false;
    }
    if (formik.values.password === '') {
      return false;
    }
    if (formik.values.passwordConfrim === '') {
      return false;
    }
    return true;
  }

  return (
    <div className={s.main}>
      <h2 className={s.register__title}>Registration new user</h2>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          style={{ marginBottom: 10 }}
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <NameIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          id="email"
          style={{ marginBottom: 10 }}
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <ShowHidePassword
          key="password"
          name="password"
          label="Password"
          handleChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <ShowHidePassword
          key="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          handleChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Button
          disableRipple
          disabled={!isValid()}
          className={s.button}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Registration
        </Button>
      </form>
    </div>
  );
}
