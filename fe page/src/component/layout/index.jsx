import { Outlet } from "react-router-dom";
import AppHeader from "../header";

function Layout() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

export default Layout;
