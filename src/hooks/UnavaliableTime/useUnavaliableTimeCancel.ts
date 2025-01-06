import { UseFormReset } from "react-hook-form";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";

interface useUnavailableTimeCancelProps {
	reset: UseFormReset<FormDataUnavailableTime>;
	setShowForm: (show: boolean) => void;
	setIsEditing: (editing: boolean) => void;
}

export const useUnavailableTimeCancel = ({
	reset,
	setShowForm,
	setIsEditing,
}: useUnavailableTimeCancelProps) => {
	const handleCancel = () => {
		reset({
			date: "",
			startTime: "",
			endTime: "",
		});
		setShowForm(false);
		setIsEditing(false);
	};

	return { handleCancel };
};
