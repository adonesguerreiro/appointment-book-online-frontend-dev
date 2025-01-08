import { useCallback } from "react";
import { FormDataCustomer } from "../../interface/FormDataCustomer";
import { deleteCustomer } from "../../services/api";
import { useCustomToast } from "../useCustomToast";

interface useCustomerDeleteProps {
	onClose: () => void;
	setShowForm: (show: boolean) => void;
	fetchCustomer: () => Promise<void>;
	selectedCustomer: FormDataCustomer | null;
	setSelectedCustomer: (customer: FormDataCustomer | null) => void;
}

export const useCustomerDelete = ({
	onClose,
	setShowForm,
	fetchCustomer,
	selectedCustomer,
	setSelectedCustomer,
}: useCustomerDeleteProps) => {
	const { showToast } = useCustomToast();

	const handleDeleteCustomer = useCallback(async () => {
		if (!selectedCustomer || !selectedCustomer.id) {
			console.error("Cliente selecionado não encontrado.");
			return;
		}

		try {
			const deletedCustomer = await deleteCustomer(selectedCustomer.id);
			if (deletedCustomer.status === 200) {
				onClose();
				showToast({
					title: "Cliente excluído com sucesso.",
					status: "success",
				});
				setShowForm(false);
				setSelectedCustomer(null);
				fetchCustomer();
			}
		} catch (error) {
			console.error("Erro ao excluir serviço", error);
		}
	}, [
		fetchCustomer,
		onClose,
		selectedCustomer,
		setSelectedCustomer,
		setShowForm,
		showToast,
	]);

	return {
		handleDeleteCustomer,
	};
};
