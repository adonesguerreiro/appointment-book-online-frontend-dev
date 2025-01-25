import { UseFormReset } from "react-hook-form";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";

interface useUnavailableTimeCancelProps {
	reset: UseFormReset<FormDataUnavailableTime>;
	closeForm: () => void;
	stopEditing: () => void;
}

export const useUnavailableTimeCancel = ({
	reset,
	closeForm,
	stopEditing,
}: useUnavailableTimeCancelProps) => {
	const handleCancel = () => {
		reset({
			date: "",
			startTime: "",
			endTime: "",
		});
		closeForm();
		stopEditing();
	};

	return { handleCancel };
};
