import { useCallback } from "react";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";
import {
	createUnavailableTime,
	updateUnavailableTime,
} from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useCustomToast } from "../useCustomToast";
import { useHandleError } from "../useHandleError";

interface useUnavaliableTimeSubmitProps {
	selectedUnavailableTime: FormDataUnavailableTime | null;
	fetchUnavaliableTime: () => Promise<void>;
	setShowForm: (show: boolean) => void;
}
export const useUnavaliableTimeSubmit = ({
	fetchUnavaliableTime,
	setShowForm,
	selectedUnavailableTime,
}: useUnavaliableTimeSubmitProps) => {
	const { token } = useAuth();
	const handleError = useHandleError();
	const { showToast } = useCustomToast();

	const handleSubmitUnavailableTime = useCallback(
		async (data: FormDataUnavailableTime) => {
			try {
				if (token && !selectedUnavailableTime) {
					const createdUnavailableTime = await createUnavailableTime(data);
					if (createdUnavailableTime.status === 200) {
						showToast({
							title: "Horário indisponível registrado com sucesso.",
							status: "success",
						});
						fetchUnavaliableTime();
						setShowForm(false);
					}
				} else {
					await updateUnavailableTime(
						Number(selectedUnavailableTime?.id),
						data
					);
					showToast({
						title: "Horário indisponível alterado com sucesso.",
						status: "info",
					});
					fetchUnavaliableTime();
					setShowForm(false);
				}
			} catch (error) {
				console.error("Erro ao salvar dados", error);
				handleError(error);
			}
		},
		[
			fetchUnavaliableTime,
			handleError,
			selectedUnavailableTime,
			setShowForm,
			showToast,
			token,
		]
	);

	return {
		handleSubmitUnavailableTime,
	};
};
