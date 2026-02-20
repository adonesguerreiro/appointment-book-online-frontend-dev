import { useCallback } from "react";
import { FormDataCustomer } from "../interface/FormDataCustomer";
import { createCustomer, updateCustomer } from "../../../services/api";
import { useHandleError } from "../../../hooks/useHandleError";
import { useCustomToast } from "../../../hooks/useCustomToast";

interface useCustomerSubmitProps {
	selectedCustomer: FormDataCustomer | null;
	fetchCustomer: () => Promise<void>;
	closeForm: () => void;
}

export const useCustomerSubmit = ({
	selectedCustomer,
	fetchCustomer,
	closeForm,
}: useCustomerSubmitProps) => {
	const { showToast } = useCustomToast();
	const handleError = useHandleError();

	const handleSubmitCustomer = useCallback(
		async (data: FormDataCustomer) => {
			try {
				if (!selectedCustomer) {
					const createdCustomer = await createCustomer(data);
					if (createdCustomer.status === 200) {
						showToast({
							title: "Cliente registrado com sucesso.",
							status: "success",
						});
						fetchCustomer();
						closeForm();
					}
				} else {
					await updateCustomer(Number(selectedCustomer?.id), data);
					showToast({
						title: "Cliente alterado com sucesso.",
						status: "info",
					});
					fetchCustomer();
					closeForm();
				}
			} catch (error) {
				console.error("Erro ao salvar dados", error);
				handleError(error);
			}
		},
		[closeForm, fetchCustomer, handleError, selectedCustomer, showToast]
	);

	return { handleSubmitCustomer };
};
