import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_APP_API_BASE_URL,
	// withCredentials: true,
	withCredentials: false,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url.includes("/refresh-token") ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await api.post("/refresh-token", {
            refreshToken: refreshToken,
          });
          const newToken = response.data.token;
          localStorage.setItem("token", newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        const publicRoutes = ["/login", "/forgot-password", "/reset-password"];
        const isPublicRoute = publicRoutes.some((route) =>
          window.location.pathname.startsWith(route)
        );

        if (!isPublicRoute) {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;

// 		if (
// 			originalRequest.url === "/session-me" ||
// 			originalRequest.url?.includes("/refresh-token")
// 		) {
// 			return Promise.reject(error);
// 		}

// 		if (error.response?.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;

// 			try {
// 				await refreshToken();
// 				return api(originalRequest);
// 			} catch (err) {
// 				const publicRoutes = ["/login", "/forgot-password", "/reset-password"];
// 				const isPublicRoute = publicRoutes.some((route) =>
// 					window.location.pathname.startsWith(route)
// 				);

// 				if (!isPublicRoute) {
// 					window.location.href = "/login";
// 				}
// 				return Promise.reject(err);
// 			}
// 		}

// 		return Promise.reject(error);
// 	}
// );
