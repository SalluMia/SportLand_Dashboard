
// PrivateRoutes.js
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  let auth = JSON.parse(localStorage.getItem("head_start"));
  console.log(auth);
  return auth ? <Outlet /> : <Navigate to={"/auth/sign-in"} />;
};
