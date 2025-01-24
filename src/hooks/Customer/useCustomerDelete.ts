import { useCallback } from "react";
import { FormDataCustomer } from "../../interface/FormDataCustomer";
import { deleteCustomer } from "../../services/api";
import { useCustomToast } from "../useCustomToast";
import { useHandleError } from "../useHandleError";

interface useCustomerDeleteProps {
	onClose: () => void;
	fetchCustomer: () => Promise<void>;
	selectedCustomer: FormDataCustomer | null;
	setSelectedCustomer: (customer: FormDataCustomer | null) => void;
	closeForm: () => void;
}

export const useCustomerDelete = ({
	onClose,
	fetchCustomer,
	selectedCustomer,
	setSelectedCustomer,
	closeForm,
}: useCustomerDeleteProps) => {
	const handleError = useHandleError();
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
				closeForm();
				setSelectedCustomer(null);
				fetchCustomer();
			}
		} catch (error) {
			console.error("Erro ao excluir cliente", error);
			onClose();
			handleError(error);
		}
	}, [
		closeForm,
		fetchCustomer,
		handleError,
		onClose,
		selectedCustomer,
		setSelectedCustomer,
		showToast,
	]);

	return {
		handleDeleteCustomer,
	};
};
