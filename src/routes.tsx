import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import LoginPage from "./features/auth/pages/Login";
import ForgotPasswordPage from "./features/auth/pages/ForgotPassword";
import ResetPasswordPage from "./features/auth/pages/ResetPassword";
import DashboardPage from "./features/dashboard/pages";
import UserPage from "./features/users/page/UserFormPage";
import ServiceListPage from "./features/services/pages/ServiceListPage";
import ServiceFormPage from "./features/services/pages/ServiceFormPage";
import CompanyFormPage from "./features/company/pages/CompanyFormPage";
import AvaliableTimeFormPage from "./features/avaliableTime/pages/AvaliableTimeFormPage";
import AvaliableTimeListPage from "./features/avaliableTime/pages/AvaliableTimeListPage";
import UnavailableTimeListPage from "./features/unavaliableTime/pages/UnavaliableTimeListPage/page";
import UnavailableTimeFormPage from "./features/unavaliableTime/pages/UnavaliableTimeFormPage/page";
import CustomerListPage from "./features/customer/pages/CustomerListPage";
import CustomerFormPage from "./features/customer/pages/CustomerFormPage";
import BookingFormPage from "./features/booking/pages/BookingFormPage";
import ProtectedRoute from "./protectedroute";
import ScheduleListPage from "./features/schedule/pages/ScheduleListPage";
import ScheduleFormPage from "./features/schedule/pages/ScheduleFormPage";

export const router = createBrowserRouter([
	{
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
				element: <BookingFormPage />,
			},
		],
	},
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: (
					<ProtectedRoute>
						<DashboardPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/user",
				element: (
					<ProtectedRoute>
						<UserPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/company",
				element: (
					<ProtectedRoute>
						<CompanyFormPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/service",
				element: (
					<ProtectedRoute>
						<ServiceListPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/service/new",
				element: (
					<ProtectedRoute>
						<ServiceFormPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/service/:id",
				element: (
					<ProtectedRoute>
						<ServiceFormPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/customer",
				element: (
					<ProtectedRoute>
						<CustomerListPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/customer/new",
				element: (
					<ProtectedRoute>
						<CustomerFormPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/customer/:id",
				element: (
					<ProtectedRoute>
						<CustomerFormPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/schedule",
				element: (
					<ProtectedRoute>
						<ScheduleListPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/schedule/new",
				element: (
					<ProtectedRoute>
						<ScheduleFormPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/schedule/:id",
				element: (
					<ProtectedRoute>
						<ScheduleFormPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/avaliable-time",
				element: (
					<ProtectedRoute>
						<AvaliableTimeListPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/avaliable-time/new",
				element: (
					<ProtectedRoute>
						<AvaliableTimeFormPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/avaliable-time/:id",
				element: (
					<ProtectedRoute>
						<AvaliableTimeFormPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/unavaliable-time",
				element: (
					<ProtectedRoute>
						<UnavailableTimeListPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/unavaliable-time/new",
				element: (
					<ProtectedRoute>
						<UnavailableTimeFormPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/unavaliable-time/:id",
				element: (
					<ProtectedRoute>
						<UnavailableTimeFormPage />
					</ProtectedRoute>
				),
			},
		],
	},
]);
