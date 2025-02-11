import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";
import { getAvaliableTimes } from "../../services/api";
import { handleAuthError } from "../../utils/handleAuthError";
import { useLoading } from "../useLoading";
import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";

export const useAvaliableTime = (currentPage: number) => {
	const [availableTime, setAvailableTime] = useState<FormDataAvailableTime[]>(
		[]
	);
	const [totalPages, setTotalPages] = useState(0);
	const { token, logout } = useAuth();
	const navigate = useNavigate();
	const { loading, startLoading, stopLoading } = useLoading();
	const fetchAvaliableTime = useCallback(async () => {
		if (!token) {
			logout();
			return;
		}

		startLoading();

		try {
			const avaliableTimeData = await getAvaliableTimes(currentPage);
			setAvailableTime(avaliableTimeData.data.avaliableTimes);
			setTotalPages(avaliableTimeData.data.totalPages);
		} catch (error) {
			handleAuthError(error, logout, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [token, startLoading, currentPage, logout, navigate, stopLoading]);

	return { availableTime, totalPages, loading, fetchAvaliableTime };
};
