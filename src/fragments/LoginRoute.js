import { Navigate, Outlet } from "react-router-dom";

// Protected Route
const PrivateRoute = (props) => {
  return props.auth ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
