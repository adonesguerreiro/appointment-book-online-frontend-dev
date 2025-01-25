import { UseFormReset } from "react-hook-form";
import { FormDataCustomer } from "../../interface/FormDataCustomer";

interface useCustomerCancelProps {
	reset: UseFormReset<FormDataCustomer>;
	closeForm: () => void;
	stopEditing: () => void;
}

export const useCustomerCancel = ({
	reset,
	closeForm,
	stopEditing,
}: useCustomerCancelProps) => {
	const handleCancel = () => {
		reset({
			customerName: "",
			mobile: "",
		});
		closeForm();
		stopEditing();
	};

	return { handleCancel };
};
