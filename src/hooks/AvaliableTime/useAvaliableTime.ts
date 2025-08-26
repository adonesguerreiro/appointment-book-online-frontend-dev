import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAvaliableTimes } from "../../services/api";
import { handleAuthError } from "../../utils/handleAuthError";
import { useLoading } from "../useLoading";
import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";

export const useAvaliableTime = (currentPage: number) => {
	const [availableTime, setAvailableTime] = useState<FormDataAvailableTime[]>(
		[]
	);
	const [totalPages, setTotalPages] = useState(0);
	const navigate = useNavigate();
	const { loading, startLoading, stopLoading } = useLoading();
	const fetchAvaliableTime = useCallback(async () => {
		startLoading();

		try {
			const avaliableTimeData = await getAvaliableTimes(currentPage);
			setAvailableTime(avaliableTimeData.data.avaliableTimes);
			setTotalPages(avaliableTimeData.data.totalPages);
		} catch (error) {
			handleAuthError(error, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [startLoading, currentPage, navigate, stopLoading]);

	return { availableTime, totalPages, loading, fetchAvaliableTime };
};
