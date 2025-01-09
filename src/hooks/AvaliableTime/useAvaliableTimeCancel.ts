import { UseFormReset } from "react-hook-form";
import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";

interface useAvaliableTimeCancelProps {
	reset: UseFormReset<FormDataAvailableTime>;
	setShowForm: (show: boolean) => void;
	setIsEditing: (editing: boolean) => void;
}

export const useAvaliableTimeCancel = ({
	reset,
	setShowForm,
	setIsEditing,
}: useAvaliableTimeCancelProps) => {
	const handleCancel = () => {
		reset({
			day: "",
			startTime: "",
			endTime: "",
			interval: 0,
		});
		setShowForm(false);
		setIsEditing(false);
	};

	return { handleCancel };
};
