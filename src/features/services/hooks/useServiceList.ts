import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FormDataService } from "../interface/FormDataService";
import { getServices } from "../services/api";
import { handleAuthError } from "../../../utils/handleAuthError";
import { useLoading } from "../../../shared/hooks/useLoading";
import { usePagination } from "@/shared/hooks/usePagination";

export const useServiceList = (currentPage: number) => {
	const [services, setServices] = useState<FormDataService[]>([]);
	const navigate = useNavigate();
	const { loading, startLoading, stopLoading } = useLoading();
	const { totalPages, setTotalPages } = usePagination();
	const fetchService = useCallback(async () => {
		startLoading();
		try {
			const { data } = await getServices(currentPage);
			setServices(data.services);
			setTotalPages(data.totalPages);
		} catch (error) {
			handleAuthError(error, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [startLoading, currentPage, setTotalPages, navigate, stopLoading]);

	return { fetchService, services, totalPages, loading };
};
