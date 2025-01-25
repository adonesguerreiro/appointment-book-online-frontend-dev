import { FormDataCustomer } from "../../interface/FormDataCustomer";
import { getCustomerById } from "../../services/api";

interface useCustomerEditProps {
	setSelectedCustomer: (schedule: FormDataCustomer | null) => void;
	openForm: () => void;
	startEditing: () => void;
}

export const useCustomerEdit = ({
	setSelectedCustomer,
	openForm,
	startEditing,
}: useCustomerEditProps) => {
	const handleEditCustomer = async (customerId: number) => {
		try {
			startEditing();
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
