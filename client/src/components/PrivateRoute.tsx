import { Route, Routes, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const isAuthenticated = () => {
  // Implement your authentication logic here.
  // For example, check if a token exists in localStorage.
  return !!localStorage.getItem('token');
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        element={
          isAuthenticated() ? (
            <Component />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default PrivateRoute;
