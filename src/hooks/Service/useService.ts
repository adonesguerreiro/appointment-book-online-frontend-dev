import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";
import { FormDataService } from "../../interface/FormDataService";
import { getServices } from "../../services/api";
import { handleAuthError } from "../../utils/handleAuthError";
import { useLoading } from "../useLoading";
import { decodeToken } from "../../utils/decodeToken";

export const useService = (currentPage: number) => {
	const [totalPages, setTotalPages] = useState(0);
	const [services, setServices] = useState<FormDataService[]>([]);
	const navigate = useNavigate();
	const { loading, startLoading, stopLoading } = useLoading();
	const { token, logout } = useAuth();
	const fetchService = useCallback(async () => {
		if (!token) {
			logout();
			return;
		}

		startLoading();

		try {
			const companyId = decodeToken(token);
			const { data } = await getServices(companyId.id, currentPage);
			setServices(data.services);
			setTotalPages(data.totalPages);
		} catch (error) {
			handleAuthError(error, logout, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [token, startLoading, currentPage, logout, navigate, stopLoading]);

	return { fetchService, services, totalPages, loading };
};
