import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./features/auth/pages/Login";
import UserPage from "./features/users/page";
import CompanyPage from "./features/company/pages";
import ServicePage from "./features/services/pages";
import AvailableTimePage from "./features/avaliableTime/pages";
import UnavaliableTimePage from "./features/unavaliableTime/pages";
import { Box, Skeleton } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import SchedulePage from "./features/schedule/pages";
import DashboardPage from "./features/dashboard/pages";
import CustomerPage from "./features/customer/pages";
import ForgotPasswordPage from "./features/auth/pages/ForgotPassword";
import ResetPasswordPage from "./features/auth/pages/ResetPassword";
import BookingPage from "./features/booking/pages";
import { useAuth } from "./features/auth/context/AuthContext";

function ProtectedRoute({ element }: { element: React.ReactElement }) {
	const { user, loading } = useAuth();

	if (loading) {
		return <Skeleton>Carregando...</Skeleton>;
	}

	return user ? element : <Navigate to="/login" />;
}
export default function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/forgot-password"
					element={<ForgotPasswordPage />}
				/>
				<Route
					path="/reset-password"
					element={<ResetPasswordPage />}
				/>
				<Route
					path="/:slugCompany"
					element={<BookingPage />}
				/>

				<Route
					path="/"
					element={
						<ProtectedRoute
							element={
								<>
									<Sidebar />
									<Box
										flex="1"
										p="10">
										<DashboardPage />
									</Box>
								</>
							}
						/>
					}
				/>

				<Route
					path="/user"
					element={
						<ProtectedRoute
							element={
								<>
									<Sidebar />
									<Box
										flex="1"
										p="10">
										<UserPage />
									</Box>
								</>
							}
						/>
					}
				/>

				<Route
					path="/company"
					element={
						<ProtectedRoute
							element={
								<>
									<Sidebar />
									<Box
										flex="1"
										p="10">
										<CompanyPage />
									</Box>
								</>
							}
						/>
					}
				/>

				<Route
					path="/service"
					element={
						<ProtectedRoute
							element={
								<>
									<Sidebar />
									<Box
										flex="1"
										p="10">
										<ServicePage />
									</Box>
								</>
							}
						/>
					}
				/>

				<Route
					path="/customer"
					element={
						<ProtectedRoute
							element={
								<>
									<Sidebar />
									<Box
										flex="1"
										p="10">
										<CustomerPage />
									</Box>
								</>
							}
						/>
					}
				/>

				<Route
					path="/schedule"
					element={
						<ProtectedRoute
							element={
								<>
									<Sidebar />
									<Box
										flex="1"
										p="10">
										<SchedulePage />
									</Box>
								</>
							}
						/>
					}
				/>

				<Route
					path="/avaliable-time"
					element={
						<ProtectedRoute
							element={
								<>
									<Sidebar />
									<Box
										flex="1"
										p="10">
										<AvailableTimePage />
									</Box>
								</>
							}
						/>
					}
				/>
				<Route
					path="/unavaliable-time"
					element={
						<ProtectedRoute
							element={
								<>
									<Sidebar />
									<Box
										flex="1"
										p="10">
										<UnavaliableTimePage />
									</Box>
								</>
							}
						/>
					}
				/>
			</Routes>
		</Router>
	);
}
