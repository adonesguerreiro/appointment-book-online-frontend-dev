import { FormDataCustomer } from "../../interface/FormDataCustomer";
import { getCustomerById } from "../../services/api";

interface useCustomerEditProps {
	setIsEditing: (editing: boolean) => void;
	setSelectedCustomer: (schedule: FormDataCustomer | null) => void;
	openForm: () => void;
}

export const useCustomerEdit = ({
	setIsEditing,
	setSelectedCustomer,
	openForm,
}: useCustomerEditProps) => {
	const handleEditCustomer = async (customerId: number) => {
		try {
			setIsEditing(true);
			const customerData = await getCustomerById(customerId);
			setSelectedCustomer(customerData.data);
			openForm();
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	return {
		handleEditCustomer,
	};
};
