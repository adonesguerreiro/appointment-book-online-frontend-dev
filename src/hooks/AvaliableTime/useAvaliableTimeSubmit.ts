import { useAuth } from "../../context/AuthContext";
import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";
import { createAvaliableTime, updateAvaliableTime } from "../../services/api";
import { useCustomToast } from "../useCustomToast";
import { useHandleError } from "../useHandleError";

interface useAvaliableTimeSubmitProps {
	selectedAvaliableTime?: FormDataAvailableTime | null;
	fetchAvaliableTime: () => Promise<void>;
	setShowForm: (show: boolean) => void;
}

export const useAvaliableTimeSubmit = ({
	selectedAvaliableTime,
	fetchAvaliableTime,
	setShowForm,
}: useAvaliableTimeSubmitProps) => {
	const { token } = useAuth();
	const { showToast } = useCustomToast();
	const handleError = useHandleError();

	const handleSubmitAvaliableTime = async (data: FormDataAvailableTime) => {
		try {
			if (token && !selectedAvaliableTime) {
				const createdService = await createAvaliableTime(data);
				if (createdService.status === 200) {
					showToast({
						title: "Horário disponível registrado com sucesso.",
						status: "success",
					});
					fetchAvaliableTime();
					setShowForm(false);
				}
			} else {
				await updateAvaliableTime(Number(selectedAvaliableTime?.id), data);
				showToast({
					title: "Horário disponível alterado com sucesso.",
					status: "info",
				});
				fetchAvaliableTime();
				setShowForm(false);
			}
		} catch (error) {
			console.error("Erro ao salvar dados", error);
			handleError(error);
		}
	};

	return { handleSubmitAvaliableTime };
};
