import { UseFormReset } from "react-hook-form";
import { FormDataService } from "../../interface/FormDataService";

interface useServiceCancelProps {
	reset: UseFormReset<FormDataService>;
	setIsEditing: (editing: boolean) => void;
	closeForm: () => void;
}

export const useServiceCancel = ({
	reset,
	closeForm,
	setIsEditing,
}: useServiceCancelProps) => {
	const handleCancel = () => {
		reset({
			serviceName: "",
			duration: "",
			price: 0,
		});
		closeForm();
		setIsEditing(false);
	};

	return { handleCancel };
};
