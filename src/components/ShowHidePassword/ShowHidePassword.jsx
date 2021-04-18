import { useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';

import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';

import s from './ShowHidePassword.module.css';

import React from 'react';

export default function ShowHidePassword({
  handleChange,
  label,
  name,
  error,
  helperText,
  value,
}) {
  const [hidePassword, setHidePassword] = useState(true);

  const showPassword = () => {
    setHidePassword(prevHidePassword => !prevHidePassword);
  };

  return (
    <TextField
      style={{ marginBottom: 10 }}
      fullWidth
      id={name}
      name={name}
      label={label}
      type={hidePassword ? 'password' : 'input'}
      value={value}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      InputProps={
        hidePassword
          ? {
              startAdornment: (
                <InputAdornment position="start">
                  <VisibilityOffTwoToneIcon
                    onClick={showPassword}
                    color="primary"
                    className={s.visibility__password}
                  />
                </InputAdornment>
              ),
            }
          : {
              startAdornment: (
                <InputAdornment position="start">
                  <VisibilityTwoToneIcon
                    onClick={showPassword}
                    color="primary"
                    className={s.visibility__password}
                  />
                </InputAdornment>
              ),
            }
      }
    />
  );
}
