import { Component } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';
import s from './ShowHidePassword.module.css';

export default class ShowHidePassword extends Component {
  state = {
    hidePassword: true,
  };

  showPassword = () => {
    this.setState(prevState => ({ hidePassword: !prevState.hidePassword }));
  };

  render() {
    const { hidePassword } = this.state;
    const { handleChange, label, name, error, helperText, value } = this.props;

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
                      onClick={this.showPassword}
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
                      onClick={this.showPassword}
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
}
