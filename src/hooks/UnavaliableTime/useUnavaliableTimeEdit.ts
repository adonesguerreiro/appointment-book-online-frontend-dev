import { useCallback } from "react";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";
import { getUnavailableTimeById } from "../../services/api";

interface useUnavaliableTimeProps {
	setIsEditing: (editing: boolean) => void;
	setShowForm: (show: boolean) => void;
	setSelectedUnavailableTime: (
		unavailableTime: FormDataUnavailableTime
	) => void;
}
export const useUnavaliableTimeEdit = ({
	setIsEditing,
	setShowForm,
	setSelectedUnavailableTime,
}: useUnavaliableTimeProps) => {
	const handleEditUnavailableTime = useCallback(
		async (unavailableTimeId: number) => {
			try {
				setIsEditing(true);
				const unavailableTimeData = await getUnavailableTimeById(
					unavailableTimeId
				);
				setSelectedUnavailableTime(unavailableTimeData.data);
				setShowForm(true);
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		},
		[setIsEditing, setSelectedUnavailableTime, setShowForm]
	);

	return {
		handleEditUnavailableTime,
	};
};
