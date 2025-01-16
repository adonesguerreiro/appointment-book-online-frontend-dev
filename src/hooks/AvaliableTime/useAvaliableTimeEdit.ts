import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";
import { getAvaliableTimeById } from "../../services/api";

interface useAvaliableTimeEditProps {
	setShowForm: (show: boolean) => void;
	setIsEditing: (editing: boolean) => void;
	setSelectAvaliableTime: (avaliableTime: FormDataAvailableTime) => void;
}

export const useAvaliableTimeEdit = ({
	setShowForm,
	setIsEditing,
	setSelectAvaliableTime,
}: useAvaliableTimeEditProps) => {
	const handleEditAvaliableTime = async (avaliableTimeId: number) => {
		try {
			setIsEditing(true);
			const avaliableTimeData = await getAvaliableTimeById(avaliableTimeId);

			setSelectAvaliableTime(avaliableTimeData.data);
			setShowForm(true);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	return {
		handleEditAvaliableTime,
	};
};
