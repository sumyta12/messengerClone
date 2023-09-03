import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const NotLoggedIn = () => {
  const user = useSelector((state) => state.signinSlice.signin);

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default NotLoggedIn;
