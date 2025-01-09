import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";
import { getAvaliableTimeById } from "../../services/api";

interface useAvaliableTimeEditProps {
	setShowForm: (show: boolean) => void;
	setIsEditing: (editing: boolean) => void;
	setSelectAvailableTime: (avaliableTime: FormDataAvailableTime) => void;
}

export const useAvaliableTimeEdit = ({
	setShowForm,
	setIsEditing,
	setSelectAvailableTime,
}: useAvaliableTimeEditProps) => {
	const handleEditAvaliableTime = async (avaliableTimeId: number) => {
		try {
			setIsEditing(true);
			const avaliableTimeData = await getAvaliableTimeById(avaliableTimeId);

			setSelectAvailableTime(avaliableTimeData.data);
			setShowForm(true);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	return {
		handleEditAvaliableTime,
	};
};
