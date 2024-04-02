// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Assuming you have an AuthContext for managing authentication

// const ProtectedRoute = ({ element, ...rest }) => {
//   const { isLoggedIn } = useAuth(); // Assuming useAuth provides information about the authentication status

//   return isLoggedIn ? <Route {...rest} element={element} /> : <Navigate to="/auth" />;
// };

// export default ProtectedRoute;