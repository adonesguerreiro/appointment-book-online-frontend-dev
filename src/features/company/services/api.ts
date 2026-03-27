import { api } from "@/shared/services/api";
import { FormDataCompany } from "../interface/FormDataCompany";
import { FormDataAddress } from "../interface/FormDataAddress";

export const getCompany = async () => {
	try {
		const { data } = await api.get(`/companies/id`);
		return data;
	} catch (error) {
		console.error("Erro ao buscar dados", error);
		throw error;
	}
};

export const updateCompany = (company: FormDataCompany) => {
	return api.put(`/companies`, company);
};

export const updateAddress = (addressId: number, address: FormDataAddress) => {
	return api.put(`/addresses/${addressId}`, address);
};
