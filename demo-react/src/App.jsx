import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./component/dashboard";
import ManageAccount from "./pages/admin/account";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";

function DemoReact() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "account",
          element: <ManageAccount />,
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default DemoReact;
