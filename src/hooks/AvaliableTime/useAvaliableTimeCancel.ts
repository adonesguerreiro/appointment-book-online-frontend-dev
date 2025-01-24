import { UseFormReset } from "react-hook-form";
import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";

interface useAvaliableTimeCancelProps {
	reset: UseFormReset<FormDataAvailableTime>;
	setIsEditing: (editing: boolean) => void;
	closeForm: () => void;
}

export const useAvaliableTimeCancel = ({
	reset,
	setIsEditing,
	closeForm,
}: useAvaliableTimeCancelProps) => {
	const handleCancel = () => {
		reset({
			day: "",
			startTime: "",
			endTime: "",
			interval: 0,
		});
		closeForm();
		setIsEditing(false);
	};

	return { handleCancel };
};
