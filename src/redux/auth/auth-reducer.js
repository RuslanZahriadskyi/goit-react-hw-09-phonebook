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

const isAutorizedReducer = createReducer(false, {
  [userRegisterSuccess]: () => true,
  [getCurrentUserSuccess]: () => true,
  [userLoginSuccess]: () => true,
  [userLoginError]: () => false,
  [userLogoutSuccess]: () => false,
  [userRegisterError]: () => false,
  [gentCurrentUserError]: () => false,
});

const authReducers = combineReducers({
  user: userReducer,
  token: tokenReducer,
  isAutorized: isAutorizedReducer,
});

export default authReducers;
