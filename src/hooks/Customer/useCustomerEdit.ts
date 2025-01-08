import { FormDataCustomer } from "../../interface/FormDataCustomer";
import { getCustomerById } from "../../services/api";

interface useCustomerEditProps {
	setShowForm: (show: boolean) => void;
	setIsEditing: (editing: boolean) => void;
	setSelectedCustomer: (schedule: FormDataCustomer | null) => void;
}

export const useCustomerEdit = ({
	setShowForm,
	setIsEditing,
	setSelectedCustomer,
}: useCustomerEditProps) => {
	const handleEditCustomer = async (customerId: number) => {
		try {
			setIsEditing(true);
			const customerData = await getCustomerById(customerId);

			setSelectedCustomer(customerData.data);
			setShowForm(true);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	return {
		handleEditCustomer,
	};
};
