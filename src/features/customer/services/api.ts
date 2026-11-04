import { api } from "@/shared/services/api";
import { FormDataCustomer } from "../interface/FormDataCustomer";
import * as Sentry from "@sentry/react";

export const getCustomers = async (currentPage?: number) => {
	try {
		const { data } = await api.get(`/customers`, {
			params: { page: currentPage, limit: 10 },
		});

		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Erro ao buscar clientes", error);
		throw error;
	}
};

export const getCustomerById = async (customerId: number) => {
	try {
		const { data } = await api.get(`/customers/${customerId}`);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Erro ao buscar cliente", error);
		throw error;
	}
};

export const getCustomerByIdApi = async (customerId: number) => {
	try {
		const { data } = await api.get(`/customers/${customerId}`);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Erro ao buscar cliente", error);
		throw error;
	}
};

export const createCustomer = async (customer: FormDataCustomer) => {
	try {
		const { data } = await api.post("/customers", customer);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Erro ao criar cliente", error);
		throw error;
	}
};

export const updateCustomer = async (
	customerId: number,
	customer: FormDataCustomer,
) => {
	try {
		const { data } = await api.put(`/customers/${customerId}`, customer);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Erro ao atualizar cliente", error);
		throw error;
	}
};

export const deleteCustomer = async (customerId: number) => {
	try {
		const { data } = await api.delete(`/customers/${customerId}`);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Erro ao excluir cliente", error);
		throw error;
	}
};
