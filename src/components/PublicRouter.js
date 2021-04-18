import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { authSelectors } from '../redux/auth';

const PublicRouter = ({ component: Component, token, ...routeProps }) => (
  <Route
    {...routeProps}
    render={props =>
      Boolean(token) && routeProps.restricted ? (
        <Redirect to="/contacts" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  token: authSelectors.getToken(state),
});

export default connect(mapStateToProps)(PublicRouter);
