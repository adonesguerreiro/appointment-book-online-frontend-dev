import { UseFormReset } from "react-hook-form";
import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";

interface useAvaliableTimeCancelProps {
	reset: UseFormReset<FormDataAvailableTime>;
	closeForm: () => void;
	stopEditing: () => void;
}

export const useAvaliableTimeCancel = ({
	reset,
	closeForm,
	stopEditing,
}: useAvaliableTimeCancelProps) => {
	const handleCancel = () => {
		reset({
			day: "",
			startTime: "",
			endTime: "",
			interval: 0,
		});
		closeForm();
		stopEditing();
	};

	return { handleCancel };
};
