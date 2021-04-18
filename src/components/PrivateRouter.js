import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { authSelectors } from '../redux/auth';

const PrivateRouter = ({ component: Component, token, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      render={props =>
        Boolean(token) ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = state => ({
  token: authSelectors.getToken(state),
});

export default connect(mapStateToProps)(PrivateRouter);
