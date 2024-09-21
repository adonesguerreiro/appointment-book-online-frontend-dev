import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

export const handleAuthError = (
	error: unknown,
	logout: () => void,
	navigate: NavigateFunction
) => {
	if (
		(error as AxiosError).response &&
		(error as AxiosError).response?.status === 401
	) {
		console.warn("Token expirado ou inválido, redirecionando para o login.");
		logout();
		navigate("/login");
	} else {
		console.error("Erro ao buscar dados:", error);
	}
};
