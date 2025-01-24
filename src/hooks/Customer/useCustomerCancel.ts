import { UseFormReset } from "react-hook-form";
import { FormDataCustomer } from "../../interface/FormDataCustomer";

interface useCustomerCancelProps {
	reset: UseFormReset<FormDataCustomer>;
	setIsEditing: (editing: boolean) => void;
	closeForm: () => void;
}

export const useCustomerCancel = ({
	reset,
	setIsEditing,
	closeForm,
}: useCustomerCancelProps) => {
	const handleCancel = () => {
		reset({
			customerName: "",
			mobile: "",
		});
		closeForm();
		setIsEditing(false);
	};

	return { handleCancel };
};
