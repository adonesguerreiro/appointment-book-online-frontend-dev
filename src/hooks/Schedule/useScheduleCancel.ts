import { UseFormReset } from "react-hook-form";
import { FormDataSchedule } from "../../interface/FormDataSchedule";

interface useScheduleCancelProps {
	reset: UseFormReset<FormDataSchedule>;
	setSelectedDate: (date: string) => void;
	setSelectedSchedule: (schedule: FormDataSchedule | null) => void;
	closeForm: () => void;
	stopEditing: () => void;
}

export const useScheduleCancel = ({
	setSelectedSchedule,
	setSelectedDate,
	reset,
	closeForm,
	stopEditing,
}: useScheduleCancelProps) => {
	const handleCancel = () => {
		reset({
			customerId: "",
			serviceId: "",
			date: "",
			status: "",
			timeSlotAvailable: "",
		});
		closeForm();
		stopEditing();
		setSelectedSchedule(null);
		setSelectedDate("");
	};

	return { handleCancel };
};
