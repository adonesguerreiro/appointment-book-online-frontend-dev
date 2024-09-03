import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import UserPage from "./pages/User";
import CompanyPage from "./pages/Company";
import ServicePage from "./pages/Service";
import AvaliableTimePage from "./pages/AvaliableTime";
import UnavaliableTimePage from "./pages/UnavaliableTime";
import { Box } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SchedulePage from "./pages/Schedule";
import DashboardPage from "./pages/Dashboard";

export default function App() {
	return (
		<>
			<Router>
				<Header />
				<Sidebar />
				<Box
					flex="1"
					p="10">
					<Routes>
						<Route
							path="/login"
							element={<LoginPage />}
						/>
						<Route
							path="/"
							element={<DashboardPage />}
						/>
						<Route
							path="/user"
							element={<UserPage />}
						/>
						<Route
							path="/company"
							element={<CompanyPage />}
						/>

						<Route
							path="/service"
							element={<ServicePage />}
						/>
						<Route
							path="/schedule"
							element={<SchedulePage />}
						/>
						<Route
							path="/avaliable-time"
							element={<AvaliableTimePage />}
						/>
						<Route
							path="/unavaliable-time"
							element={<UnavaliableTimePage />}
						/>
					</Routes>
				</Box>
			</Router>
		</>
	);
}
