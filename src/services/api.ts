import axios from "axios";
import { FormDataLogin } from "../interface/FormDataLogin";
import { FormDataService } from "../interface/FormDataService";
import { FormDataUser } from "../interface/FormDataUser";

const api = axios.create({
	baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

export const auth = (auth: FormDataLogin) => {
	return api.post("/sessions", {
		email: auth.email,
		password: auth.password,
	});
};

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const getAllUsers = () => {
	return api.get("/users");
};

export const getUserById = (userId: number) => {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("Token not found");
	}

	return api.get(`/users/${userId}`);
};

export const updateUser = (userId: number, user: FormDataUser) => {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("Token not found");
	}

	return api.put(`/users/${userId}`, user);
};

export const getCompany = (companyId: number) => {
	return api.get(`/companies/${companyId}`);
};

export const getServices = () => {
	return api.get("/services");
};

export const createService = (service: FormDataService) => {
	return api.post("/services", service);
};

export const updateService = (serviceId: number, service: FormDataService) => {
	return api.put(`/services/${serviceId}`, service);
};

export const deleteService = (serviceId: number) => {
	return api.delete(`/services/${serviceId}`);
};

export default api;
