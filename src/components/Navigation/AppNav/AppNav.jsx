import { NavLink } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '../../../redux/auth';

import s from './AppNav.module.css';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import HomeIcon from '@material-ui/icons/Home';

export default function AppNav() {
  const token = useSelector(authSelectors.getToken);

  return (
    <div className={s.app__nav}>
      <NavLink to="/" className={s.nav__link}>
        <HomeIcon color="primary" style={{ fontSize: 40 }} />
        Home
      </NavLink>

      {Boolean(token) && (
        <NavLink to="/contacts" className={s.nav__contacts}>
          <MenuBookIcon color="primary" style={{ fontSize: 40 }} />
          Contacts
        </NavLink>
      )}
    </div>
  );
}
