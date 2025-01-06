import { useCallback } from "react";
import { FormDataService } from "../../interface/FormDataService";
import { createService, updateService } from "../../services/api";
import { useCustomToast } from "../useCustomToast";
import { useHandleError } from "../useHandleError";
import { useAuth } from "../../context/AuthContext";

interface useServiceSubmitProps {
	fetchService: () => Promise<void>;
	setShowForm: (show: boolean) => void;
	selectedService?: FormDataService | null;
}

export const useServiceSubmit = ({
	fetchService,
	setShowForm,
	selectedService,
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
						setShowForm(false);
					}
				} else {
					await updateService(Number(selectedService?.id), data);
					showToast({
						title: "Serviço alterado com sucesso.",
						status: "info",
					});
					fetchService();
					setShowForm(false);
				}
			} catch (error) {
				console.error("Erro ao salvar dados", error);
				handleError(error);
			}
		},
		[fetchService, handleError, selectedService, setShowForm, showToast, token]
	);

	return { handleSubmitService };
};
