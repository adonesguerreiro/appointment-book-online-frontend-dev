import { getCompany } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Dispatch, SetStateAction, useCallback } from "react";
import { decodeToken } from "../../utils/decodeToken";
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
			const companyId = decodeToken(token);
			const { data } = await getCompany(companyId.id);
			reset({
				name: data.name,
				email: data.email,
				mobile: data.mobile,
				cnpj: data.cnpj,
				street: data.addresses[0].street,
				number: data.addresses[0].number,
				complement: data.addresses[0].complement,
				neighborhood: data.addresses[0].neighborhood,
				city: data.addresses[0].city,
				state: data.addresses[0].state,
				postalCode: data.addresses[0].postalCode,
			});
			setPostalCodeData(data.addresses[0].postalCode);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	}, [reset, setPostalCodeData, token]);

	return {
		fetchDataCompany,
	};
};
