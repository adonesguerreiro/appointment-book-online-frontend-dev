import { useCallback } from "react";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";
import { getUnavailableTimeById } from "../../services/api";

interface useUnavaliableTimeProps {
	setIsEditing: (editing: boolean) => void;
	setSelectedUnavailableTime: (
		unavailableTime: FormDataUnavailableTime
	) => void;
	openForm: () => void;
}
export const useUnavaliableTimeEdit = ({
	setIsEditing,
	setSelectedUnavailableTime,
	openForm,
}: useUnavaliableTimeProps) => {
	const handleEditUnavailableTime = useCallback(
		async (unavailableTimeId: number) => {
			try {
				setIsEditing(true);
				const unavailableTimeData = await getUnavailableTimeById(
					unavailableTimeId
				);
				setSelectedUnavailableTime(unavailableTimeData.data);
				openForm();
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		},
		[openForm, setIsEditing, setSelectedUnavailableTime]
	);

	return {
		handleEditUnavailableTime,
	};
};
