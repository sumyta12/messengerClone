import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
//import LogInFrom from "../LoginIn/Index";

const LoginPrivateRoute = () => {
  const user = useSelector((state) => state.signinSlice.signin);

  return user ? <Outlet /> : <Navigate to="/login" replace /> 
};

export default LoginPrivateRoute;
