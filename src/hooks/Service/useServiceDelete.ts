import { useCallback } from "react";
import { FormDataService } from "../../interface/FormDataService";
import { deleteService } from "../../services/api";
import { useCustomToast } from "../useCustomToast";
import { useHandleError } from "../useHandleError";

interface useServiceDeleteProps {
	onClose: () => void;
	setShowForm: (show: boolean) => void;
	fetchService: () => Promise<void>;
	selectedService?: FormDataService | null;
	setSelectedService: (service: FormDataService | null) => void;
}
export const useServiceDelete = ({
	onClose,
	setShowForm,
	fetchService,
	selectedService,
	setSelectedService,
}: useServiceDeleteProps) => {
	const { showToast } = useCustomToast();
	const handleError = useHandleError();

	const handleDeleteService = useCallback(async () => {
		if (!selectedService || !selectedService.id) {
			console.error("Serviço selecionado não encontrado.");
			return;
		}

		try {
			const deletedService = await deleteService(selectedService.id);
			if (deletedService.status === 200) {
				onClose();
				showToast({
					title: "Serviço excluído com sucesso.",
					status: "success",
				});
				setShowForm(false);
				setSelectedService(null);
				fetchService();
			}
		} catch (error) {
			console.error("Erro ao excluir serviço", error);
			onClose();
			handleError(error);
		}
	}, [
		fetchService,
		handleError,
		onClose,
		selectedService,
		setSelectedService,
		setShowForm,
		showToast,
	]);

	return { handleDeleteService };
};
