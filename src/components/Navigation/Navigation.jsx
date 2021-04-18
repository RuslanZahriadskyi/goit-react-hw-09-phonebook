import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authOperations, authSelectors } from '../../redux/auth';
import s from './Navigation.module.css';
import AppNav from './AppNav/AppNav';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import userImage from './user.jpg';

class Navigation extends Component {
  render() {
    const { token, userName, onLogout, isAutorized } = this.props;

    return (
      <div className={s.navigation}>
        <AppNav />
        {Boolean(token) ? (
          <>
            <div className={s.user__nav}>
              <img
                src={userImage}
                alt="avatar user"
                className={s.user__avatar}
              />
              {isAutorized && (
                <p className={s.user__name}>Welcome, {userName}</p>
              )}
              <button onClick={onLogout} className={s.logout__button}>
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
}

const mapStateToProps = state => ({
  token: authSelectors.getToken(state),
  userName: state.auth.user.name,
  isAutorized: authSelectors.isAutorizedUser(state),
});

const mapDispatchToProps = {
  onLogout: authOperations.logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
