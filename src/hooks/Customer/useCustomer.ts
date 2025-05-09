import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";
import { FormDataCustomer } from "../../interface/FormDataCustomer";
import { getCustomers } from "../../services/api";
import { handleAuthError } from "../../utils/handleAuthError";
import { useLoading } from "../useLoading";

export const useCustomer = (currentPage: number) => {
	const [customers, setCustomers] = useState<FormDataCustomer[]>([]);
	const [totalPages, setTotalPages] = useState(0);
	const { token, logout } = useAuth();
	const navigate = useNavigate();
	const { loading, startLoading, stopLoading } = useLoading();

	const fetchCustomer = useCallback(async () => {
		if (!token) {
			logout();
			return;
		}

		startLoading();

		try {
			const { data } = await getCustomers(currentPage);
			setCustomers(data.customers);
			setTotalPages(data.totalPages);
		} catch (error) {
			handleAuthError(error, logout, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [token, startLoading, currentPage, logout, navigate, stopLoading]);

	return {
		customers,
		totalPages,
		loading,
		fetchCustomer,
	};
};
