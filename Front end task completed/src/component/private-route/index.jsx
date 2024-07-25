import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return children ? children : <Outlet />;
}

export default PrivateRoute;
