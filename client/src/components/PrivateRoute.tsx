import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('token');

const PrivateRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
