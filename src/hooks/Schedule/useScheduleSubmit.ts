import { useCallback } from "react";
import { FormDataSchedule } from "../../interface/FormDataSchedule";
import { createSchedule, updateSchedule } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast";
import { useHandleError } from "../useHandleError";

interface useScheduleSubmitProps {
	selectedSchedule?: FormDataSchedule | null;
	fetchSchedules: () => Promise<void>;
	setShowForm: (show: boolean) => void;
}

export const useScheduleSubmit = ({
	selectedSchedule,
	fetchSchedules,
	setShowForm,
}: useScheduleSubmitProps) => {
	const { token } = useAuth();
	const handleError = useHandleError();

	const handleSubmitSchedule = useCallback(
		async (data: FormDataSchedule) => {
			try {
				if (token && !selectedSchedule) {
					const createdSchedule = await createSchedule(data);
					if (createdSchedule.status === 200) {
						Toast({
							title: "Agendamento realizado com sucesso",
							status: "success",
						});
						fetchSchedules();
						setShowForm(false);
					}
				} else {
					await updateSchedule(Number(selectedSchedule?.id), data);
					Toast({
						title: "Agendamento alterado com sucesso.",
						status: "info",
					});
					fetchSchedules();
					setShowForm(false);
				}
			} catch (error) {
				console.error("Erro ao salvar dados", error);
				handleError(error);
			}
		},
		[token, selectedSchedule, fetchSchedules, setShowForm, handleError]
	);

	return {
		handleSubmitSchedule,
	};
};
