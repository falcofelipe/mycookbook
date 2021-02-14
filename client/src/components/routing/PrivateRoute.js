import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthState';

const PrivateRoute = ({ component: Component, ...rest }) => {
  //...rest accepts an indefinite nr of arguments as an array

  const authState = useAuth()[0];
  const { isAuthenticated, loading } = authState;

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
