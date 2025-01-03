import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FormDataSchedule } from "../../interface/FormDataSchedule";
import { getSchedules } from "../../services/api";
import { decodeToken } from "../../utils/decodeToken";
import { handleAuthError } from "../../utils/handleAuthError";
import { useLoading } from "../useLoading";

export const useSchedules = (currentPage: number) => {
	const [schedules, setSchedules] = useState<FormDataSchedule[]>([]);
	const [totalPages, setTotalPages] = useState(0);
	const { token, logout } = useAuth();
	const navigate = useNavigate();
	const { loading, setLoading } = useLoading();

	const fetchSchedules = useCallback(async () => {
		if (!token) return;

		setLoading(true);
		try {
			const companyId = decodeToken(token);
			const { data } = await getSchedules(companyId.id, currentPage);
			setSchedules(data.schedules);
			setTotalPages(data.totalPages);
		} catch (error) {
			handleAuthError(error, logout, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			setLoading(false);
		}
	}, [token, setLoading, currentPage, logout, navigate]); // Dependências simplificadas

	return {
		schedules,
		totalPages,
		loading,
		fetchSchedules,
	};
};
