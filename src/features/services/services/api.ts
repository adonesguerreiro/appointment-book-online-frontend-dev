import { api } from "@/shared/services/api";
import { FormDataService } from "../interface/FormDataService";
import * as Sentry from "@sentry/react";

export const getServices = async (currentPage?: number) => {
	try {
		const { data } = await api.get(`/services`, {
			params: { page: currentPage, limit: 10 },
		});
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Error fetching services:", error);
		throw error;
	}
};

export const getServicesById = async (serviceId: number) => {
	try {
		const { data } = await api.get(`/services/${serviceId}`);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Error fetching service:", error);
		throw error;
	}
};

export const getService = async (serviceId: number) => {
	try {
		const { data } = await api.get(`/services/${serviceId}`);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Error fetching service:", error);
		throw error;
	}
};

export const createService = async (service: FormDataService) => {
	try {
		const { data } = await api.post("/services", service);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Error creating service:", error);
		throw error;
	}
};

export const updateService = async (
	serviceId: number,
	service: FormDataService,
) => {
	try {
		const { data } = await api.put(`/services/${serviceId}`, service);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Error updating service:", error);
		throw error;
	}
};

export const deleteService = async (serviceId: number) => {
	try {
		const { data } = await api.delete(`/services/${serviceId}`);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Error deleting service:", error);
		throw error;
	}
};
