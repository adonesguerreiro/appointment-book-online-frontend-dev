import { useCallback } from "react";
import { FormDataService } from "../../interface/FormDataService";
import { createService, updateService } from "../../services/api";
import { useCustomToast } from "../useCustomToast";
import { useHandleError } from "../useHandleError";
import { useAuth } from "../../context/AuthContext";

interface useServiceSubmitProps {
	fetchService: () => Promise<void>;
	selectedService?: FormDataService | null;
	closeForm: () => void;
}

export const useServiceSubmit = ({
	fetchService,
	selectedService,
	closeForm,
}: useServiceSubmitProps) => {
	const { token } = useAuth();
	const handleError = useHandleError();
	const { showToast } = useCustomToast();

	const handleSubmitService = useCallback(
		async (data: FormDataService) => {
			try {
				if (token && !selectedService) {
					const createdService = await createService(data);
					if (createdService.status === 200) {
						showToast({
							title: "Serviço registrado com sucesso.",
							status: "success",
						});

						fetchService();
						closeForm();
					}
				} else {
					await updateService(Number(selectedService?.id), data);
					showToast({
						title: "Serviço alterado com sucesso.",
						status: "info",
					});
					fetchService();
					closeForm();
				}
			} catch (error) {
				console.error("Erro ao salvar dados", error);
				handleError(error);
			}
		},
		[closeForm, fetchService, handleError, selectedService, showToast, token]
	);

	return { handleSubmitService };
};
