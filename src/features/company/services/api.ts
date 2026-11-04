import { api } from "@/shared/services/api";
import { FormDataCompany } from "../interface/FormDataCompany";
import { FormDataAddress } from "../interface/FormDataAddress";
import * as Sentry from "@sentry/react";

export const getCompany = async () => {
	try {
		const { data } = await api.get(`/companies/id`);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Erro ao buscar dados", error);
		throw error;
	}
};

export const updateCompany = async (company: FormDataCompany) => {
	try {
		const { data } = await api.put(`/companies`, company);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Erro ao atualizar empresa", error);
		throw error;
	}
};

export const updateAddress = async (
	addressId: number,
	address: FormDataAddress,
) => {
	try {
		const { data } = await api.put(`/addresses/${addressId}`, address);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Erro ao atualizar endereço", error);
		throw error;
	}
};
