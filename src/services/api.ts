import axios from "axios";
import { FormDataLogin } from "../interface/FormDataLogin";
import { FormDataService } from "../interface/FormDataService";
import { FormDataUser } from "../interface/FormDataUser";
import { FormDataCompany } from "../interface/FormDataCompany";
import { FormDataAddress } from "../interface/FormDataAddress";
import { FormDataAvailableTime } from "../interface/FormDataAvailableTime";
import { FormDataUnavailableTime } from "../interface/FormDataUnavailableTime";
import { FormDataCustomer } from "../interface/FormDataCustomer";
import { FormDataSchedule } from "../interface/FormDataSchedule";

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

export const getSchedules = (companyId: number) => {
	return api.get(`/schedules/company/${companyId}`);
};

export const getScheduleById = (scheduleId: number) => {
	return api.get(`/schedules/${scheduleId}`);
};

export const createSchedule = (schedule: FormDataSchedule) => {
	return api.post("/schedules", schedule);
};

export const updateSchedule = (
	scheduleId: number,
	schedule: FormDataSchedule
) => {
	return api.put(`/schedules/${scheduleId}`, schedule);
};

export const getCustomers = (companyId: number) => {
	return api.get(`/customers/company/${companyId}`);
};

export const getCustomerById = (customerId: number) => {
	return api.get(`/customers/${customerId}`);
};

export const createCustomer = (customer: FormDataCustomer) => {
	return api.post("/customers", customer);
};

export const updateCustomer = (
	customerId: number,
	customer: FormDataCustomer
) => {
	return api.put(`/customers/${customerId}`, customer);
};

export const deleteCustomer = (customerId: number) => {
	return api.delete(`/customers/${customerId}`);
};

export const getAvaliableTimes = (companyId: number) => {
	return api.get(`/available-times/company/${companyId}`);
};

export const getAvaliableTimesSlots = (companyId: number, date: string) => {
	return api.get(`/available-times/company/${companyId}/?date=${date}`);
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

export const getUnavailableTimes = (companyId: number) => {
	return api.get(`/unavailable-times/company/${companyId}`);
};

export const getUnavailableTimeById = (unavailableTimeId: number) => {
	return api.get(`/unavailable-times/${unavailableTimeId}`);
};

export const createUnavailableTime = (
	unavailableTime: FormDataUnavailableTime
) => {
	return api.post("/unavailable-times", unavailableTime);
};

export const updateUnavailableTime = (
	unavailableTimeId: number,
	unavailableTime: FormDataUnavailableTime
) => {
	return api.put(`/unavailable-times/${unavailableTimeId}`, unavailableTime);
};

export const deleteUnavailableTime = (unavailableTimeId: number) => {
	return api.delete(`/unavailable-times/${unavailableTimeId}`);
};

export default api;
