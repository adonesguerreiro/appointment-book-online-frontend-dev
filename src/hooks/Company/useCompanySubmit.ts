import { FormDataCompany } from "../../interface/FormDataCompany";
import { updateCompany, updateAddress } from "../../services/api";
import { viaCep } from "../../services/viaCep";
import { useAuth } from "../../hooks/useAuth";
import { useLoading } from "../useLoading";
import { useCustomToast } from "../useCustomToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, UseFormSetValue } from "react-hook-form";
import { companySchema } from "../../validators/companySchema";
import { useHandleError } from "../useHandleError";

interface useCompanySubmitProps {
	setValue: UseFormSetValue<FormDataCompany>;
	postalCodeData: string;
}

export const useCompanySubmit = ({
	setValue,
	postalCodeData,
}: useCompanySubmitProps) => {
	const { token } = useAuth();
	const { loading, setLoading } = useLoading();
	const { showToast } = useCustomToast();
	const { setError } = useForm<FormDataCompany>({
		resolver: yupResolver(companySchema),
	});
	const handleError = useHandleError();

	const handleSubmitCompany = async (data: FormDataCompany) => {
		setLoading(true);

		if (!token) return;

		try {
			if (postalCodeData !== data.postalCode) {
				const existingCep = await viaCep(data.postalCode);
				if (existingCep != "CEP inválido") {
					data.city = existingCep.localidade;
					data.state = existingCep.uf;
					setValue("city", existingCep.localidade);
					setValue("state", existingCep.uf);
					setLoading(false);
				} else {
					setValue("city", "");
					setValue("state", "");
					setError("postalCode", {
						type: "manual",
						message: existingCep as string,
					});
					return;
				}
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
	};

	return {
		handleSubmitCompany,
		loading,
	};
};
