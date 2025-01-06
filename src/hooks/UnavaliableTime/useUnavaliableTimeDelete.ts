import { useCallback } from "react";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";
import { useCustomToast } from "../useCustomToast";
import { deleteUnavailableTime } from "../../services/api";

interface useUnavailableTimeDeleteProps {
	onClose: () => void;
	setShowForm: (show: boolean) => void;
	fetchUnavaliableTime: () => Promise<void>;
	selectedUnavailableTime?: FormDataUnavailableTime | null;
	setSelectedUnavailableTime: (time: FormDataUnavailableTime | null) => void;
}
export const useUnavaliableTimeDelete = ({
	onClose,
	setShowForm,
	fetchUnavaliableTime,
	selectedUnavailableTime,
	setSelectedUnavailableTime,
}: useUnavailableTimeDeleteProps) => {
	const { showToast } = useCustomToast();

	const handleDeleteUnavailableTime = useCallback(async () => {
		if (!selectedUnavailableTime || !selectedUnavailableTime.id) {
			console.error("Horário indisponível selecionado não encontrado.");
			return;
		}

		try {
			const deletedUnavailableTime = await deleteUnavailableTime(
				selectedUnavailableTime.id
			);
			if (deletedUnavailableTime.status === 200) {
				onClose();
				showToast({
					title: "Horário indisponível excluído com sucesso.",
					status: "success",
				});
				setShowForm(false);
				setSelectedUnavailableTime(null);
				fetchUnavaliableTime();
			}
		} catch (error) {
			console.error("Erro ao excluir horário disponível", error);
		}
	}, [
		fetchUnavaliableTime,
		onClose,
		selectedUnavailableTime,
		setSelectedUnavailableTime,
		setShowForm,
		showToast,
	]);

	return {
		handleDeleteUnavailableTime,
	};
};
