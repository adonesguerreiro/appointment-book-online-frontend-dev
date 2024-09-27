import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

export function useHandleError() {
	const toast = useToast();

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

			toast({
				title: errorMessage,
				status: "warning",
				duration: 3000,
				isClosable: true,
				position: "top-right",
			});
		} else {
			console.error("Erro desconhecido", error);
		}
	}

	return handleError;
}
