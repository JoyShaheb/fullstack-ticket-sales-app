import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const token = useSelector((state: RootState) => state.user.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
