import { UseFormReset } from "react-hook-form";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";

interface useUnavailableTimeCancelProps {
	reset: UseFormReset<FormDataUnavailableTime>;
	setIsEditing: (editing: boolean) => void;
	closeForm: () => void;
}

export const useUnavailableTimeCancel = ({
	reset,
	setIsEditing,
	closeForm,
}: useUnavailableTimeCancelProps) => {
	const handleCancel = () => {
		reset({
			date: "",
			startTime: "",
			endTime: "",
		});
		closeForm();
		setIsEditing(false);
	};

	return { handleCancel };
};
