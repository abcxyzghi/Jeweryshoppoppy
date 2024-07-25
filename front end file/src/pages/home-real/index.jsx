import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomeReal() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  return <div>HomeReal</div>;
}

export default HomeReal;
