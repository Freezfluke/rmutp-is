import { Navigate, Outlet } from "react-router-dom";

// Protected Route
const PrivateRoute = (props) => {
  return props.auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
