import { useCallback, useState } from "react";
import { getUnavailableTimes } from "../../services/api";
import { useLoading } from "../useLoading";
import { decodeToken } from "../../utils/decodeToken";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { handleAuthError } from "../../utils/handleAuthError";

export const useUnavaliableTime = (currentPage: number) => {
	const [unavaliables, setUnavaliables] = useState<FormDataUnavailableTime[]>(
		[]
	);
	const [totalPages, setTotalPages] = useState(0);
	const navigate = useNavigate();
	const { token, logout } = useAuth();
	const { loading, setLoading } = useLoading();
	const fetchUnavaliableTime = useCallback(async () => {
		if (!token) return;
		setLoading(true);

		try {
			const companyId = decodeToken(token);
			const { data } = await getUnavailableTimes(companyId.id, currentPage);
			setUnavaliables(data.unavailableTimes);
			setTotalPages(data.totalPages);
		} catch (error) {
			handleAuthError(error, logout, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			setLoading(false);
		}
	}, [token, setLoading, currentPage, logout, navigate]);

	return { fetchUnavaliableTime, unavaliables, totalPages, loading };
};
