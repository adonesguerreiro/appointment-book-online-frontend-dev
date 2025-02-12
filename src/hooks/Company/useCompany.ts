import { getCompany } from "../../services/api";
import { useAuth } from "../useAuth";
import { Dispatch, SetStateAction, useCallback } from "react";
import { UseFormReset } from "react-hook-form";
import { FormDataCompany } from "../../interface/FormDataCompany";

interface useCompanyProps {
	reset: UseFormReset<FormDataCompany>;
	setPostalCodeData: Dispatch<SetStateAction<string | undefined>>;
}

export const useCompany = ({ reset, setPostalCodeData }: useCompanyProps) => {
	const { token } = useAuth();

	const fetchDataCompany = useCallback(async () => {
		if (!token) {
			return;
		}

		try {
			const { data } = await getCompany();
			reset({
				name: data.name,
				email: data.email,
				mobile: data.mobile,
				cnpj: data.cnpj,
				street: data.addresses.street,
				number: data.addresses.number,
				complement: data.addresses.complement,
				neighborhood: data.addresses.neighborhood,
				city: data.addresses.city,
				state: data.addresses.state,
				postalCode: data.addresses.postalCode,
			});
			setPostalCodeData(data.addresses.postalCode);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	}, [reset, setPostalCodeData, token]);

	return {
		fetchDataCompany,
	};
};
