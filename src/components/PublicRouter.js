import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

import { authSelectors } from '../redux/auth';

export default function PublicRouter({ children, ...routeProps }) {
  const token = useSelector(authSelectors.getToken);
  return (
    <Route {...routeProps}>
      {Boolean(token) && routeProps.restricted ? (
        <Redirect to="/contacts" />
      ) : (
        children
      )}
    </Route>
  );
}
