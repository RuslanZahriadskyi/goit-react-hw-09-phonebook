import axios from 'axios';
import { toast } from 'react-toastify';
import {
  getCurrentUserRequest,
  getCurrentUserSuccess,
  gentCurrentUserError,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterError,
  userLoginError,
  userLoginRequest,
  userLoginSuccess,
  userLogoutRequest,
  userLogoutError,
  userLogoutSuccess,
} from './auth-actions';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unSet() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: getToken },
  } = getState();

  if (!getToken) {
    return;
  }

  token.set(getToken);
  dispatch(getCurrentUserRequest());

  try {
    const { data } = await axios.get('/users/current');

    dispatch(getCurrentUserSuccess(data));
  } catch (error) {
    dispatch(gentCurrentUserError('Current user error please login'));
  }
};

const registerNewUser = newUser => async dispatch => {
  dispatch(userRegisterRequest());

  try {
    const { data } = await axios.post('/users/signup', newUser);

    token.set(data.token);
    dispatch(userRegisterSuccess(data));
  } catch (error) {
    dispatch(userRegisterError('Name or email already exist'));
  }
};

const loginUser = user => async dispatch => {
  dispatch(userLoginRequest());

  try {
    const { data } = await axios.post('/users/login', user);

    token.set(data.token);
    dispatch(userLoginSuccess(data));
  } catch (error) {
    dispatch(userLoginError('Email or password does`t exist'));
  }
};

const logoutUser = () => async dispatch => {
  dispatch(userLogoutRequest());

  try {
    axios.post('/users/logout');

    token.unSet();
    dispatch(userLogoutSuccess());
  } catch (error) {
    dispatch(userLogoutError(error.message));
  }
};

export { getCurrentUser, registerNewUser, loginUser, logoutUser };
