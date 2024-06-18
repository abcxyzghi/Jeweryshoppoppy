import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./component/dashboard";
import ManageAccount from "./pages/admin/account";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import { ManageCategory } from "./pages/manager/category";
import { ManageProduct } from "./pages/manager/product";
import { ManageVoucher } from "./pages/manager/voucher";

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
        {
          path: "category",
          element: <ManageCategory />,
        },
        {
          path: "product",
          element: <ManageProduct />,
        },
        {
          path: "voucher",
          element: <ManageVoucher />,
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
