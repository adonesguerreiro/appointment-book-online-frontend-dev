import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

export function useHandleError() {
	const toast = useToast();

	function handleError(error: unknown) {
		if (error instanceof AxiosError) {
			const errors =
				error.response?.data.errors[0] || error.response?.data.errors;
			toast({
				title: errors?.message || "Erro desconhecido",
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
