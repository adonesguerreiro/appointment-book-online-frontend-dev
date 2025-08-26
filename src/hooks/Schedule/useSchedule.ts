import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FormDataSchedule } from "../../interface/FormDataSchedule";
import { getSchedules } from "../../services/api";
import { handleAuthError } from "../../utils/handleAuthError";
import { useLoading } from "../useLoading";

export const useSchedules = (currentPage: number) => {
	const [schedules, setSchedules] = useState<FormDataSchedule[]>([]);
	const [totalPages, setTotalPages] = useState(0);

	const navigate = useNavigate();
	const { loading, startLoading, stopLoading } = useLoading();

	const fetchSchedules = useCallback(async () => {
		startLoading();
		try {
			const { data } = await getSchedules(currentPage);
			setSchedules(data.schedules);
			setTotalPages(data.totalPages);
		} catch (error) {
			handleAuthError(error, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [startLoading, currentPage, navigate, stopLoading]);

	return {
		schedules,
		totalPages,
		loading,
		fetchSchedules,
	};
};
