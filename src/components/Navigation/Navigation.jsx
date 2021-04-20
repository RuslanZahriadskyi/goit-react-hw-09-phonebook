import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { authOperations, authSelectors } from '../../redux/auth';

import s from './Navigation.module.css';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import userImage from './user.jpg';

import AppNav from './AppNav/AppNav';
import { toast } from 'react-toastify';

export default function Navigation() {
  const token = useSelector(authSelectors.getToken);
  const userName = useSelector(state => state.auth.user.name);
  const isAutorized = useSelector(authSelectors.isAutorizedUser);

  const dispatch = useDispatch();
  const logoutNtf = () => {
    toast.info('Goodbye and come back again');
  };

  return (
    <div className={s.navigation}>
      <AppNav />
      {Boolean(token) ? (
        <>
          <div className={s.user__nav}>
            <img src={userImage} alt="avatar user" className={s.user__avatar} />
            {isAutorized && <p className={s.user__name}>Welcome, {userName}</p>}
            <button
              onClick={() => dispatch(authOperations.logoutUser(), logoutNtf())}
              className={s.logout__button}
            >
              <ExitToAppIcon fontSize="large" style={{ fontSize: 40 }} />
            </button>
          </div>
        </>
      ) : (
        <>
          <NavLink to="/login" className={s.nav__link}>
            <MeetingRoomIcon style={{ fontSize: 40 }} color="primary" />
            Login
          </NavLink>
          <NavLink to="/register" className={s.nav__link}>
            <VpnKeyIcon style={{ fontSize: 40 }} color="primary" />
            Registration
          </NavLink>
        </>
      )}
    </div>
  );
}
