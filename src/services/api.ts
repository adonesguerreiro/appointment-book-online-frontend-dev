import axios from "axios";
import { FormDataLogin } from "../interface/FormDataLogin";
import { FormDataService } from "../interface/FormDataService";
import { FormDataUser } from "../interface/FormDataUser";
import { FormDataCompany } from "../interface/FormDataCompany";
import { FormDataAddress } from "../interface/FormDataAddress";
import { FormDataAvailableTime } from "../interface/FormDataAvailableTime";

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

export const getUser = (userId: number) => {
	return api.get(`/users/${userId}`);
};

export const updateUser = (user: FormDataUser) => {
	return api.put(`/users`, user);
};

export const getCompany = (companyId: number) => {
	return api.get(`/companies/${companyId}`);
};

export const updateCompany = (company: FormDataCompany) => {
	return api.put(`/companies`, company);
};

export const updateAddress = (addressId: number, address: FormDataAddress) => {
	return api.put(`/addresses/${addressId}`, address);
};

export const getServices = (companyId: number) => {
	return api.get(`/services/company/${companyId}`);
};

export const getServicesById = (serviceId: number) => {
	return api.get(`/services/${serviceId}`);
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

export const getAvaliableTimes = (companyId: number) => {
	return api.get(`/available-times/company/${companyId}`);
};

export const getAvaliableTimeById = (avaliableTimeId: number) => {
	return api.get(`/available-times/${avaliableTimeId}`);
};

export const createAvaliableTime = (avalibleTime: FormDataAvailableTime) => {
	return api.post("/available-times", avalibleTime);
};

export const updateAvaliableTime = (
	avaliableTimeId: number,
	avalibleTime: FormDataAvailableTime
) => {
	return api.put(`/available-times/${avaliableTimeId}`, avalibleTime);
};

export default api;
