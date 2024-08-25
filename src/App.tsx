import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import UserPage from "./pages/User";
import CompanyPage from "./pages/Company";
import ServicePage from "./pages/Service";
import AvaliableTimePage from "./pages/AvaliableTime";
import UnavaliableTimePage from "./pages/UnavaliableTime";

export default function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route
						path="/login"
						element={<LoginPage />}
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
						path="/avaliable-time"
						element={<AvaliableTimePage />}
					/>
					<Route
						path="/unavaliable-time"
						element={<UnavaliableTimePage />}
					/>
				</Routes>
			</Router>
		</>
	);
}
