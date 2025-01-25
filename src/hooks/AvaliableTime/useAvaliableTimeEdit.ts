import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";
import { getAvaliableTimeById } from "../../services/api";

interface useAvaliableTimeEditProps {
	setSelectAvaliableTime: (avaliableTime: FormDataAvailableTime) => void;
	openForm: () => void;
	startEditing: () => void;
}

export const useAvaliableTimeEdit = ({
	setSelectAvaliableTime,
	openForm,
	startEditing,
}: useAvaliableTimeEditProps) => {
	const handleEditAvaliableTime = async (avaliableTimeId: number) => {
		try {
			startEditing();
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
