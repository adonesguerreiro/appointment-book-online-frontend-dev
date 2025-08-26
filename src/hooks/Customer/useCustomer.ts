import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FormDataCustomer } from "../../interface/FormDataCustomer";
import { getCustomers } from "../../services/api";
import { handleAuthError } from "../../utils/handleAuthError";
import { useLoading } from "../useLoading";

export const useCustomer = (currentPage: number) => {
	const [customers, setCustomers] = useState<FormDataCustomer[]>([]);
	const [totalPages, setTotalPages] = useState(0);
	const navigate = useNavigate();
	const { loading, startLoading, stopLoading } = useLoading();

	const fetchCustomer = useCallback(async () => {

		startLoading();

		try {
			const { data } = await getCustomers(currentPage);
			setCustomers(data.customers);
			setTotalPages(data.totalPages);
		} catch (error) {
			handleAuthError(error, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [startLoading, currentPage, navigate, stopLoading]);

	return {
		customers,
		totalPages,
		loading,
		fetchCustomer,
	};
};
