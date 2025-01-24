import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";
import { getAvaliableTimeById } from "../../services/api";

interface useAvaliableTimeEditProps {
	setIsEditing: (editing: boolean) => void;
	setSelectAvaliableTime: (avaliableTime: FormDataAvailableTime) => void;
	openForm: () => void;
}

export const useAvaliableTimeEdit = ({
	setIsEditing,
	setSelectAvaliableTime,
	openForm,
}: useAvaliableTimeEditProps) => {
	const handleEditAvaliableTime = async (avaliableTimeId: number) => {
		try {
			setIsEditing(true);
			const avaliableTimeData = await getAvaliableTimeById(avaliableTimeId);
			setSelectAvaliableTime(avaliableTimeData.data);
			openForm();
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	return {
		handleEditAvaliableTime,
	};
};
