import { refreshToken } from "@/features/auth/services/auth";
import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_APP_API_BASE_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			originalRequest.url === "/session-me" ||
			originalRequest.url?.includes("/refresh-token")
		) {
			return Promise.reject(error);
		}

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				await refreshToken();
				return api(originalRequest);
			} catch (err) {
				const publicRoutes = ["/login", "/forgot-password", "/reset-password"];
				const isPublicRoute = publicRoutes.some((route) =>
					window.location.pathname.startsWith(route),
				);

				if (!isPublicRoute) {
					window.location.href = "/login";
				}
				return Promise.reject(err);
			}
		}

		return Promise.reject(error);
	},
);
