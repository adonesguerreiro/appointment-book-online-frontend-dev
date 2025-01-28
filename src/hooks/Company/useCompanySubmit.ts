import { FormDataCompany } from "../../interface/FormDataCompany";
import { updateCompany, updateAddress } from "../../services/api";
import { viaCep } from "../../services/viaCep";
import { useAuth } from "../../hooks/useAuth";
import { useLoading } from "../useLoading";
import { useCustomToast } from "../useCustomToast";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";
import { useHandleError } from "../useHandleError";
import { useCallback } from "react";

interface useCompanySubmitProps {
	setValue: UseFormSetValue<FormDataCompany>;
	postalCodeData: string;
	setError: UseFormSetError<FormDataCompany>;
}

export const useCompanySubmit = ({
	setValue,
	postalCodeData,
	setError,
}: useCompanySubmitProps) => {
	const { token } = useAuth();
	const { loading, setLoading } = useLoading();
	const { showToast } = useCustomToast();

	const handleError = useHandleError();

	const handleSubmitCompany = useCallback(
		async (data: FormDataCompany) => {
			setLoading(true);

			if (!token) return;

			try {
				if (postalCodeData !== data.postalCode) {
					const existingCep = await viaCep(data.postalCode);

					if (existingCep === "CEP inválido") {
						setValue("city", "");
						setValue("state", "");
						setValue("postalCode", "");
						setError("postalCode", {
							type: "manual",
							message: existingCep,
						});
						return;
					}

					data.city = existingCep.localidade;
					data.state = existingCep.uf;
					setValue("city", existingCep.localidade);
					setValue("state", existingCep.uf);
				}

				const updatedCompany = await updateCompany(data);
				const addressCompanyId =
					updatedCompany.data.companyUpdated.addresses[0].id;
				const updatedAddress = await updateAddress(addressCompanyId, data);
				if (updatedCompany.status === 200 && updatedAddress.status === 200) {
					showToast({
						title: "Alterado com sucesso!",
						status: "success",
					});
				}
			} catch (error) {
				console.error("Erro ao salvar dados", error);
				handleError(error);
				setLoading(false);
				return;
			} finally {
				setLoading(false);
			}
		},
		[
			handleError,
			postalCodeData,
			setError,
			setLoading,
			setValue,
			showToast,
			token,
		]
	);

	return {
		handleSubmitCompany,
		loading,
	};
};
