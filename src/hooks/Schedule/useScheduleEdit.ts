import { FormDataSchedule } from "../../interface/FormDataSchedule";
import { getScheduleById } from "../../services/api";

interface useScheduleSubmitEditProps {
	setSelectedSchedule: (schedule: FormDataSchedule | null) => void;
	openForm: () => void;
	startEditing: () => void;
}

export const useScheduleEdit = ({
	setSelectedSchedule,
	openForm,
	startEditing,
}: useScheduleSubmitEditProps) => {
	const handleEditSchedule = async (scheduleId: number) => {
		try {
			startEditing();
			const scheduleData = await getScheduleById(scheduleId);
			setSelectedSchedule(scheduleData.data);
			openForm();
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	return {
		handleEditSchedule,
	};
};
