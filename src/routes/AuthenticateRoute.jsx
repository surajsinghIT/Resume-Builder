import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SIGNIN } from "../utils/RouteList";
import { useEffect, useState } from "react";

const AuthenticateRoute = () => {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Re-check token whenever route changes or token might update
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [location]);

  return token ? <Outlet /> : 
  <Navigate to={SIGNIN} state={{toastMessage: "Please sign in to continue"}}
   replace />;
};

export default AuthenticateRoute;
