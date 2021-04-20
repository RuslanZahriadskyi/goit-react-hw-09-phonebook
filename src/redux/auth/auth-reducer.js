import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  gentCurrentUserError,
  getCurrentUserSuccess,
  userLoginError,
  userLoginSuccess,
  userLogoutSuccess,
  userRegisterError,
  userRegisterSuccess,
} from './auth-actions';

const initialUser = { email: null, name: null };

const userReducer = createReducer(initialUser, {
  [getCurrentUserSuccess]: (_, { payload }) => payload,
  [userRegisterSuccess]: (_, { payload }) => payload.user,
  [userLoginSuccess]: (_, { payload }) => payload.user,
  [userLogoutSuccess]: (_, __) => initialUser,
});

const tokenReducer = createReducer(null, {
  [userRegisterSuccess]: (_, { payload }) => payload.token,
  [userLoginSuccess]: (_, { payload }) => payload.token,
  [userLogoutSuccess]: (_, __) => null,
  [gentCurrentUserError]: () => null,
});

const setiIsAutorized = () => true;

const isAutorizedReducer = createReducer(false, {
  [userRegisterSuccess]: setiIsAutorized,
  [getCurrentUserSuccess]: setiIsAutorized,
  [userLoginSuccess]: setiIsAutorized,
  [userLoginError]: () => false,
  [userLogoutSuccess]: () => false,
  [userRegisterError]: () => false,
  [gentCurrentUserError]: () => false,
});

const setError = (_, { payload }) => payload;

const errorReducer = createReducer('', {
  [userLoginError]: setError,
  [userRegisterError]: setError,
  [gentCurrentUserError]: setError,
  [userLoginSuccess]: (_, __) => '',
  [userRegisterSuccess]: (_, __) => '',
  [getCurrentUserSuccess]: (_, __) => '',
});

const authReducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  isAutorized: isAutorizedReducer,
  error: errorReducer,
});

export default authReducers;
