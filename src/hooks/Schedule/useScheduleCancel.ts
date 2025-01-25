import { UseFormReset } from "react-hook-form";
import { FormDataSchedule } from "../../interface/FormDataSchedule";

interface useScheduleCancelProps {
	reset: UseFormReset<FormDataSchedule>;
	setSelectedDate: (date: string) => void;
	setIsEditing: (editing: boolean) => void;
	setSelectedSchedule: (schedule: FormDataSchedule | null) => void;
	closeForm: () => void;
}

export const useScheduleCancel = ({
	setIsEditing,
	setSelectedSchedule,
	setSelectedDate,
	reset,
	closeForm,
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
		setIsEditing(false);
		setSelectedSchedule(null);
		setSelectedDate("");
	};

	return { handleCancel };
};
