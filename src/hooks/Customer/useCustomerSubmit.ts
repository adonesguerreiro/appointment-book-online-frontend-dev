import { useCallback } from "react";
import { FormDataCustomer } from "../../interface/FormDataCustomer";
import { createCustomer, updateCustomer } from "../../services/api";
import { useHandleError } from "../useHandleError";
import { useAuth } from "../../context/AuthContext";
import { useCustomToast } from "../useCustomToast";

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
	const { token } = useAuth();
	const { showToast } = useCustomToast();
	const handleError = useHandleError();

	const handleSubmitCustomer = useCallback(
		async (data: FormDataCustomer) => {
			try {
				if (token && !selectedCustomer) {
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
		[closeForm, fetchCustomer, handleError, selectedCustomer, showToast, token]
	);

	return { handleSubmitCustomer };
};
