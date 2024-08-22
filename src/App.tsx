import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import UserPage from "./pages/User";
import CompanyPage from "./pages/Company";
import ServicePage from "./pages/Service";

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
				</Routes>
			</Router>
		</>
	);
}
