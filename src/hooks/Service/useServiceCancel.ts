import { UseFormReset } from "react-hook-form";
import { FormDataService } from "../../interface/FormDataService";

interface useServiceCancelProps {
	reset: UseFormReset<FormDataService>;
	setShowForm: (show: boolean) => void;
	setIsEditing: (editing: boolean) => void;
}

export const useServiceCancel = ({
	reset,
	setShowForm,
	setIsEditing,
}: useServiceCancelProps) => {
	const handleCancel = () => {
		reset({
			serviceName: "",
			duration: "",
			price: 0,
		});
		setShowForm(false);
		setIsEditing(false);
	};

	return { handleCancel };
};
