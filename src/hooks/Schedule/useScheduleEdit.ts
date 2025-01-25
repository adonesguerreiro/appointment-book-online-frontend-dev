import { FormDataSchedule } from "../../interface/FormDataSchedule";
import { getScheduleById } from "../../services/api";

interface useScheduleSubmitEditProps {
	setIsEditing: (editing: boolean) => void;
	setSelectedSchedule: (schedule: FormDataSchedule | null) => void;
	openForm: () => void;
}

export const useScheduleEdit = ({
	setIsEditing,
	setSelectedSchedule,
	openForm,
}: useScheduleSubmitEditProps) => {
	const handleEditSchedule = async (scheduleId: number) => {
		try {
			setIsEditing(true);
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
