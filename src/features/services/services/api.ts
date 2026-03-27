import { api } from "@/shared/services/api";
import { FormDataService } from "../interface/FormDataService";

export const getServices = async (currentPage?: number) => {
	try {
		const { data } = await api.get(`/services`, {
			params: { page: currentPage, limit: 10 },
		});
		return data;
	} catch (error) {
		console.error("Error fetching services:", error);
		throw error;
	}
};

export const getServicesById = async (serviceId: number) => {
	try {
		const { data } = await api.get(`/services/${serviceId}`);
		return data;
	} catch (error) {
		console.error("Error fetching service:", error);
		throw error;
	}
};

export const getService = (serviceId: number) => {
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
