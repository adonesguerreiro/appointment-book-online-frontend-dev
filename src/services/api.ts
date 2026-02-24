// import { FormDataForgotPassword } from "../features/auth/interface/FormDataForgotPassword";
// import axios from "axios";
// import { FormDataLogin } from "../features/auth/interface/FormDataLogin";
// import { FormDataService } from "../features/services/interface/FormDataService";
// import { FormDataUser } from "../features/users/interface/FormDataUser";
// import { FormDataCompany } from "../features/company/interface/FormDataCompany";
// import { FormDataAddress } from "../features/company/interface/FormDataAddress";
// import { FormDataAvailableTime } from "../features/avaliableTime/interface/FormDataAvailableTime";
// import { FormDataUnavailableTime } from "../features/unavaliableTime/interface/FormDataUnavailableTime";
// import { FormDataCustomer } from "../features/customer/interface/FormDataCustomer";
// import { FormDataSchedule } from "../features/schedule/interface/FormDataSchedule";
// import { FormDataResetPassword } from "../features/auth/interface/FormDataResetPassword";
// import { BookingAppointmentData } from "../features/booking/interface/BookingAppointmentData";

// const api = axios.create({
// 	baseURL: import.meta.env.VITE_APP_API_BASE_URL,
// 	// withCredentials: true,
// 	withCredentials: false,
// });

// api.interceptors.request.use((config) => {
// 	const token = localStorage.getItem("token");

// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}
// 	return config;
// });

// api.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;

// 		if (
// 			originalRequest.url.includes("/refresh-token") ||
// 			originalRequest._retry
// 		) {
// 			return Promise.reject(error);
// 		}

// 		if (error.response?.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;

// 			try {
// 				const refreshToken = localStorage.getItem("refreshToken");
// 				if (refreshToken) {
// 					const response = await api.post("/refresh-token", {
// 						refreshToken: refreshToken,
// 					});
// 					const newToken = response.data.token;
// 					localStorage.setItem("token", newToken);
// 					originalRequest.headers.Authorization = `Bearer ${newToken}`;
// 					return api(originalRequest);
// 				}
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

// // api.interceptors.response.use(
// // 	(response) => response,
// // 	async (error) => {
// // 		const originalRequest = error.config;

// // 		if (
// // 			originalRequest.url === "/session-me" ||
// // 			originalRequest.url?.includes("/refresh-token")
// // 		) {
// // 			return Promise.reject(error);
// // 		}

// // 		if (error.response?.status === 401 && !originalRequest._retry) {
// // 			originalRequest._retry = true;

// // 			try {
// // 				await refreshToken();
// // 				return api(originalRequest);
// // 			} catch (err) {
// // 				const publicRoutes = ["/login", "/forgot-password", "/reset-password"];
// // 				const isPublicRoute = publicRoutes.some((route) =>
// // 					window.location.pathname.startsWith(route)
// // 				);

// // 				if (!isPublicRoute) {
// // 					window.location.href = "/login";
// // 				}
// // 				return Promise.reject(err);
// // 			}
// // 		}

// // 		return Promise.reject(error);
// // 	}
// // );
// export const auth = (auth: FormDataLogin) => {
// 	return api.post("/sessions", {
// 		email: auth.email,
// 		password: auth.password,
// 	});
// };

// export const authMe = () => {
// 	return api.get("/session-me");
// };

// export const logout = () => {
// 	return api.post("/logout");
// };

// export const refreshToken = () => {
// 	return api.post("/refresh-token", {
// 		refreshToken: localStorage.getItem("refreshToken"),
// 	});
// };

// export const forgotPassword = ({ email }: FormDataForgotPassword) => {
// 	return api.post("/forgot-password", { email });
// };

// export const resetPassword = (token: string, data: FormDataResetPassword) => {
// 	return api.post(`/reset-password?token=${token}`, {
// 		newPassword: data.newPassword,
// 	});
// };

// export const publicGetCompany = (
// 	slugCompany: string,
// 	date?: Date,
// 	currentPage?: number
// ) => {
// 	return api.get(`/public/${slugCompany}?date=${date}`, {
// 		params: { page: currentPage, limit: 10 },
// 	});
// };

// export const publicBookAppointment = (
// 	bookingData: BookingAppointmentData,
// 	slugCompany: string
// ) => {
// 	return api.post(`/public/booking/${slugCompany}`, bookingData);
// };

// export const updateUpload = (data: FormData) => {
// 	return api.put("/upload", data, {
// 		headers: {
// 			"Content-Type": "multipart/form-data",
// 		},
// 	});
// };

// export const getDashboard = (month?: string, year?: string) => {
// 	return api.get(`/dashboard/month/${month}/year/${year}`);
// };

// export const getUserById = () => {
// 	return api.get(`/users/id`);
// };

// export const updateUser = (user: FormDataUser) => {
// 	return api.put(`/users`, user);
// };

// export const getCompany = () => {
// 	return api.get(`/companies/id`);
// };

// export const updateCompany = (company: FormDataCompany) => {
// 	return api.put(`/companies`, company);
// };

// export const updateAddress = (addressId: number, address: FormDataAddress) => {
// 	return api.put(`/addresses/${addressId}`, address);
// };

// export const getServices = (currentPage?: number) => {
// 	return api.get(`/services`, {
// 		params: { page: currentPage, limit: 10 },
// 	});
// };

// export const getServicesById = (serviceId: number) => {
// 	return api.get(`/services/${serviceId}`);
// };

// export const createService = (service: FormDataService) => {
// 	return api.post("/services", service);
// };

// export const updateService = (serviceId: number, service: FormDataService) => {
// 	return api.put(`/services/${serviceId}`, service);
// };

// export const deleteService = (serviceId: number) => {
// 	return api.delete(`/services/${serviceId}`);
// };

// export const getSchedules = async (currentPage: number) => {
// 	return api.get(`/schedules`, {
// 		params: { page: currentPage, limit: 10 },
// 	});
// };

// export const getScheduleById = (scheduleId: number) => {
// 	return api.get(`/schedules/${scheduleId}`);
// };

// export const createSchedule = (schedule: FormDataSchedule) => {
// 	return api.post("/schedules", schedule);
// };

// export const updateSchedule = (
// 	scheduleId: number,
// 	schedule: FormDataSchedule
// ) => {
// 	return api.put(`/schedules/${scheduleId}`, schedule);
// };

// export const getCustomers = (currentPage?: number) => {
// 	return api.get(`/customers`, {
// 		params: { page: currentPage, limit: 10 },
// 	});
// };

// export const getCustomerById = (customerId: number) => {
// 	return api.get(`/customers/${customerId}`);
// };

// export const createCustomer = (customer: FormDataCustomer) => {
// 	return api.post("/customers", customer);
// };

// export const updateCustomer = (
// 	customerId: number,
// 	customer: FormDataCustomer
// ) => {
// 	return api.put(`/customers/${customerId}`, customer);
// };

// export const deleteCustomer = (customerId: number) => {
// 	return api.delete(`/customers/${customerId}`);
// };

// export const getAvaliableTimes = (currentPage: number) => {
// 	return api.get(`/avaliable-times`, {
// 		params: { page: currentPage, limit: 10 },
// 	});
// };

// export const getAvaliableTimesSlots = (date: string) => {
// 	return api.get(`/avaliable-times?date=${date}`);
// };

// export const getAvaliableTimeById = (avaliableTimeId: number) => {
// 	return api.get(`/avaliable-times/${avaliableTimeId}`);
// };

// export const createAvaliableTime = (avalibleTime: FormDataAvailableTime) => {
// 	return api.post("/avaliable-times", avalibleTime);
// };

// export const updateAvaliableTime = (
// 	avaliableTimeId: number,
// 	avalibleTime: FormDataAvailableTime
// ) => {
// 	return api.put(`/avaliable-times/${avaliableTimeId}`, avalibleTime);
// };

// export const deleteAvaliableTime = (avaliableTimeId: number) => {
// 	return api.delete(`/avaliable-times/${avaliableTimeId}`);
// };

// export const getUnavailableTimes = (currentPage: number) => {
// 	return api.get(`/unavaliable-times`, {
// 		params: { page: currentPage, limit: 10 },
// 	});
// };

// export const getUnavailableTimeById = (unavailableTimeId: number) => {
// 	return api.get(`/unavaliable-times/${unavailableTimeId}`);
// };

// export const createUnavailableTime = (
// 	unavailableTime: FormDataUnavailableTime
// ) => {
// 	return api.post("/unavaliable-times", unavailableTime);
// };

// export const updateUnavailableTime = (
// 	unavailableTimeId: number,
// 	unavailableTime: FormDataUnavailableTime
// ) => {
// 	return api.put(`/unavaliable-times/${unavailableTimeId}`, unavailableTime);
// };

// export const deleteUnavailableTime = (unavailableTimeId: number) => {
// 	return api.delete(`/unavaliable-times/${unavailableTimeId}`);
// };

// export default api;
