import { UseFormReset } from "react-hook-form";
import { FormDataSchedule } from "../../interface/FormDataSchedule";

interface useScheduleCancelProps {
	reset: UseFormReset<FormDataSchedule>;
	setSelectedDate: (date: string) => void;
	setShowForm: (show: boolean) => void;
	setIsEditing: (editing: boolean) => void;
	setSelectedSchedule: (schedule: FormDataSchedule | null) => void;
}

export const useScheduleCancel = ({
	setShowForm,
	setIsEditing,
	setSelectedSchedule,
	setSelectedDate,
	reset,
}: useScheduleCancelProps) => {
	const handleCancel = () => {
		reset({
			customerId: "",
			serviceId: "",
			date: "",
			status: "",
			timeSlotAvailable: "",
		});
		setShowForm(false);
		setIsEditing(false);
		setSelectedSchedule(null);
		setSelectedDate("");
	};

	return { handleCancel };
};
