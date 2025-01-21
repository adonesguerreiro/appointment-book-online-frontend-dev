import { useCallback } from "react";
import { useCustomToast } from "../useCustomToast";
import { deleteAvaliableTime } from "../../services/api";
import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";
import { useHandleError } from "../useHandleError";

interface useAvaliableTimeDeleteProps {
	onClose: () => void;
	setShowForm: (show: boolean) => void;
	fetchAvaliableTime: () => Promise<void>;
	selectedAvaliableTime?: FormDataAvailableTime | null;
	setSelectAvaliableTime: (
		avaliableTimeId: FormDataAvailableTime | null
	) => void;
}
export const useAvaliableTimeDelete = ({
	onClose,
	setShowForm,
	fetchAvaliableTime,
	selectedAvaliableTime,
	setSelectAvaliableTime,
}: useAvaliableTimeDeleteProps) => {
	const handleError = useHandleError();
	const { showToast } = useCustomToast();

	const handleDeleteAvaliableTime = useCallback(async () => {
		if (!selectedAvaliableTime || !selectedAvaliableTime.id) {
			console.error("Horário indisponível selecionado não encontrado.");
			return;
		}

		try {
			const deletedUnavailableTime = await deleteAvaliableTime(
				selectedAvaliableTime.id
			);
			if (deletedUnavailableTime.status === 200) {
				onClose();
				showToast({
					title: "Horário disponível excluído com sucesso.",
					status: "success",
				});
				setShowForm(false);
				setSelectAvaliableTime(null);
				fetchAvaliableTime();
			}
		} catch (error) {
			console.error("Erro ao excluir horário disponível", error);
			onClose();
			handleError(error);
		}
	}, [
		fetchAvaliableTime,
		handleError,
		onClose,
		selectedAvaliableTime,
		setSelectAvaliableTime,
		setShowForm,
		showToast,
	]);

	return {
		handleDeleteAvaliableTime,
	};
};
