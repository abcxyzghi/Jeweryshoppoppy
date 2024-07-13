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
import Pos from "./pages/staff/pos";
import Layout from "./component/layout";
import PrivateRoute from "./component/private-route";
import { ManageOrder } from "./pages/manager/order";
import StaffShift from "./pages/staff/shift";
import Buy from "./pages/staff/buy";
import ManagerShift from "./pages/manager/shift-manager";
import { ManageOrderBuy } from "./pages/manager/order-buy";
import { Managesize } from "./pages/manager/size";

function DemoReact() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
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
          path: "staff",
          element: <PrivateRoute />,
          children: [
            {
              path: "pos",
              element: <Pos />,
            },
            {
              path: "buy",
              element: <Buy />,
            },
          ],
        },
      ],
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
        {
          path: "order",
          element: <ManageOrder />,
        },
        {
          path: "order-buy",
          element: <ManageOrderBuy />,
        },
        {
          path: "shift",
          element: <StaffShift />,
        },
        {
          path: "shift-manager",
          element: <ManagerShift />,
        },
        {
          path: "size",
          element: <Managesize />,
        },
        {
          path: "price",
          element: <Home />,
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
