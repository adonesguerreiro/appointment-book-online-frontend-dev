import { useCallback } from "react";
import { FormDataSchedule } from "../../interface/FormDataSchedule";
import { createSchedule, updateSchedule } from "../../services/api";
import { useHandleError } from "../useHandleError";
import { useCustomToast } from "../useCustomToast";

interface useScheduleSubmitProps {
	selectedSchedule?: FormDataSchedule | null;
	fetchSchedules: () => Promise<void>;
	closeForm: () => void;
}

export const useScheduleSubmit = ({
	selectedSchedule,
	fetchSchedules,
	closeForm,
}: useScheduleSubmitProps) => {
	const handleError = useHandleError();
	const { showToast } = useCustomToast();

	const handleSubmitSchedule = useCallback(
		async (data: FormDataSchedule) => {
			try {
				if ( !selectedSchedule) {
					const createdSchedule = await createSchedule(data);
					if (createdSchedule.status === 200) {
						showToast({
							title: "Agendamento realizado com sucesso",
							status: "success",
						});
						fetchSchedules();
						closeForm();
					}
				} else {
					await updateSchedule(Number(selectedSchedule?.id), data);
					showToast({
						title: "Agendamento alterado com sucesso.",
						status: "info",
					});
					fetchSchedules();
					closeForm();
				}
			} catch (error) {
				console.error("Erro ao salvar dados", error);
				handleError(error);
			}
		},
		[selectedSchedule, showToast, fetchSchedules, closeForm, handleError]
	);

	return {
		handleSubmitSchedule,
	};
};
