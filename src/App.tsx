import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import UserPage from "./pages/User";
import CompanyPage from "./pages/Company";
import ServicePage from "./pages/Service";
import AvailableTimePage from "./pages/AvaliableTime";
import UnavaliableTimePage from "./pages/UnavaliableTime";
import { Box } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SchedulePage from "./pages/Schedule";
import DashboardPage from "./pages/Dashboard";
import CustomerPage from "./pages/Customer";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import BookingPage from "./pages/BookAppointment";

const isAuthenticated = () => {
	return localStorage.getItem("token") !== null;
};

function ProtectedRoute({ element }: { element: JSX.Element }) {
	return isAuthenticated() ? element : <Navigate to="/login" />;
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
									<Header />
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
									<Header />
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
									<Header />
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
									<Header />
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
									<Header />
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
									<Header />
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
									<Header />
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
									<Header />
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
