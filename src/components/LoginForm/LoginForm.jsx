import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { InputAdornment, TextField, Button } from '@material-ui/core';

import s from './LoginForm.module.css';

import EmailIcon from '@material-ui/icons/Email';
import ShowHidePassword from '../ShowHidePassword';

const validationSchema = Yup.object({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('Enter your password')
    .min(7, 'Password should be of minimum 7 characters length')
    .required('Password is required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(authOperations.loginUser(values));
    },
  });

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
    <div className={s.form__container}>
      {/* <ToastContainer autoClose={2000} /> */}

      <h2 className={s.form__title}>Please login to your Phonebook</h2>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <TextField
          style={{ marginBottom: 10 }}
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
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
        <Button
          disableRipple
          disabled={!isValid()}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
