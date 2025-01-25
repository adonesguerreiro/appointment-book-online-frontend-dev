import { UseFormReset } from "react-hook-form";
import { FormDataService } from "../../interface/FormDataService";

interface useServiceCancelProps {
	reset: UseFormReset<FormDataService>;
	closeForm: () => void;
	stopEditing: () => void;
}

export const useServiceCancel = ({
	reset,
	closeForm,
	stopEditing,
}: useServiceCancelProps) => {
	const handleCancel = () => {
		reset({
			serviceName: "",
			duration: "",
			price: 0,
		});
		closeForm();
		stopEditing();
	};

	return { handleCancel };
};
