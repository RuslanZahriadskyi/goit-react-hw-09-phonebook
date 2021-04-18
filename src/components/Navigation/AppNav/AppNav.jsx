import { NavLink } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { authSelectors } from '../../../redux/auth';
import s from './AppNav.module.css';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import HomeIcon from '@material-ui/icons/Home';

const AppNav = ({ token }) => {
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
};

const mapStateToProps = state => ({
  token: authSelectors.getToken(state),
});

export default connect(mapStateToProps)(AppNav);
