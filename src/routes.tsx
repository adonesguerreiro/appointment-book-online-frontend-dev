import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import LoginPage from "./features/auth/pages/Login";
import ForgotPasswordPage from "./features/auth/pages/ForgotPassword";
import ResetPasswordPage from "./features/auth/pages/ResetPassword";
import BookingPage from "./features/booking/pages";
import DashboardPage from "./features/dashboard/pages";
import UserPage from "./features/users/page";
import CompanyPage from "./features/company/pages";
import ServicePage from "./features/services/pages";
import CustomerPage from "./features/customer/pages";
import SchedulePage from "./features/schedule/pages";
import AvaliableTimePage from "./features/avaliableTime/pages";
import UnavaliableTimePage from "./features/unavaliableTime/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/:slugCompany",
        element: <BookingPage />,
      },
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/company",
        element: <CompanyPage />,
      },
      {
        path: "/service",
        element: <ServicePage />,
      },
      {
        path: "/service/new",
        element: <ServicePage />,
      },
      {
        path: "/service/:id",
        element: <ServicePage />,
      },
      {
        path: "/customer",
        element: <CustomerPage />,
      },
      {
        path: "/customer/new",
        element: <CustomerPage />,
      },
      {
        path: "/customer/:id",
        element: <CustomerPage />,
      },
      {
        path: "/schedule",
        element: <SchedulePage />,
      },
      {
        path: "/schedule/new",
        element: <SchedulePage />,
      },
      {
        path: "/schedule/:id",
        element: <SchedulePage />,
      },
      {
        path: "/avaliable-time",
        element: <AvaliableTimePage/>,
      },
      {
        path: "/avaliable-time/new",
        element: <AvaliableTimePage/>,
      },
      {
        path: "/avaliable-time/:id",
        element: <AvaliableTimePage/>,
      },
      {
        path: "/unavaliable-time",
        element: <UnavaliableTimePage/>,
      },
      {
        path: "/unavaliable-time/new",
        element: <UnavaliableTimePage/>,
      },
      {
        path: "/unavaliable-time/:id",
        element: <UnavaliableTimePage/>,
      },
    ],
  },
]);
