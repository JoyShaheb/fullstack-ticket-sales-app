import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const userUid = useSelector((state: RootState) => state.user.userUid);
  console.log("userUid", userUid);
  return userUid ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
