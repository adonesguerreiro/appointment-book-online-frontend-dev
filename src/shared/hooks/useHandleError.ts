import { AxiosError } from "axios";
import { useCustomToast } from "./useCustomToast";

export function useHandleError() {
	const { showToast } = useCustomToast();

	function handleError(error: unknown) {
		if (error instanceof AxiosError) {
			const errors =
				error.response?.data.message || error.response?.data.errors;
			const errorMessage =
				typeof errors === "string"
					? errors
					: Array.isArray(errors)
					? errors[0].message
					: "Ocorreu um erro";

			showToast({
				title: errorMessage,
				status: "warning",
			});
		} else {
			console.error("Erro desconhecido", error);
		}
	}

	return handleError;
}
