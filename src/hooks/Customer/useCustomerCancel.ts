import { UseFormReset } from "react-hook-form";
import { FormDataCustomer } from "../../interface/FormDataCustomer";

interface useCustomerCancelProps {
	reset: UseFormReset<FormDataCustomer>;
	setShowForm: (show: boolean) => void;
	setIsEditing: (editing: boolean) => void;
}

export const useCustomerCancel = ({
	reset,
	setShowForm,
	setIsEditing,
}: useCustomerCancelProps) => {
	const handleCancel = () => {
		reset({
			customerName: "",
			mobile: "",
		});
		setShowForm(false);
		setIsEditing(false);
	};

	return { handleCancel };
};
