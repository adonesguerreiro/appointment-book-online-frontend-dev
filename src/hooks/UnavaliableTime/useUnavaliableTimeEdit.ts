import { useCallback } from "react";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";
import { getUnavailableTimeById } from "../../services/api";

interface useUnavaliableTimeProps {
	setSelectedUnavailableTime: (
		unavailableTime: FormDataUnavailableTime
	) => void;
	openForm: () => void;
	startEditing: () => void;
}
export const useUnavaliableTimeEdit = ({
	setSelectedUnavailableTime,
	openForm,
	startEditing,
}: useUnavaliableTimeProps) => {
	const handleEditUnavailableTime = useCallback(
		async (unavailableTimeId: number) => {
			try {
				startEditing();
				const unavailableTimeData = await getUnavailableTimeById(
					unavailableTimeId
				);
				setSelectedUnavailableTime(unavailableTimeData.data);
				openForm();
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		},
		[openForm, setSelectedUnavailableTime, startEditing]
	);

	return {
		handleEditUnavailableTime,
	};
};
