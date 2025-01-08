import { useCallback } from "react";
import { getCustomerById } from "../../services/api";
import { FormDataCustomer } from "../../interface/FormDataCustomer";

interface useCustomerOpenDeleteModal {
	setSelectedCustomer: (customer: FormDataCustomer) => void;
	onOpen: () => void;
}

export const useCustomerOpenDeleteModal = ({
	setSelectedCustomer,
	onOpen,
}: useCustomerOpenDeleteModal) => {
	const handleCustomerOpenModalDelete = useCallback(
		async (customerId: number) => {
			try {
				const customerData = await getCustomerById(customerId);

				setSelectedCustomer(customerData.data);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do serviço", error);
			}
		},
		[onOpen, setSelectedCustomer]
	);

	return { handleCustomerOpenModalDelete };
};
