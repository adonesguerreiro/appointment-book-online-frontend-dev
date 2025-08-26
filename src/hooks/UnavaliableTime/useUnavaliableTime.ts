import { useCallback, useState } from "react";
import { getUnavailableTimes } from "../../services/api";
import { useLoading } from "../useLoading";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";
import { useNavigate } from "react-router-dom";
import { handleAuthError } from "../../utils/handleAuthError";

export const useUnavaliableTime = (currentPage: number) => {
	const [unavaliables, setUnavaliables] = useState<FormDataUnavailableTime[]>(
		[]
	);
	const [totalPages, setTotalPages] = useState(0);
	const navigate = useNavigate();
	const { loading, startLoading, stopLoading } = useLoading();
	const fetchUnavaliableTime = useCallback(async () => {
		startLoading();

		try {
			const { data } = await getUnavailableTimes(currentPage);
			setUnavaliables(data.unavaliableTimes);
			setTotalPages(data.totalPages);
		} catch (error) {
			handleAuthError(error, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [startLoading, currentPage, navigate, stopLoading]);

	return { fetchUnavaliableTime, unavaliables, totalPages, loading };
};
