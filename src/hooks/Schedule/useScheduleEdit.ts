import { FormDataSchedule } from "../../interface/FormDataSchedule";
import { getScheduleById } from "../../services/api";

interface useScheduleSubmitEditProps {
	setShowForm: (show: boolean) => void;
	setIsEditing: (editing: boolean) => void;
	setSelectedSchedule: (schedule: FormDataSchedule | null) => void;
}

export const useScheduleEdit = ({
	setShowForm,
	setIsEditing,
	setSelectedSchedule,
}: useScheduleSubmitEditProps) => {
	const handleEditSchedule = async (scheduleId: number) => {
		try {
			setIsEditing(true);
			const scheduleData = await getScheduleById(scheduleId);
			setSelectedSchedule(scheduleData.data);
			setShowForm(true);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	return {
		handleEditSchedule,
	};
};
