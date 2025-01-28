import { useCallback, useState } from "react";
import { useAuth } from "../useAuth";
import { getAvaliableTimesSlots } from "../../services/api";
import { handleAuthError } from "../../utils/handleAuthError";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../utils/decodeToken";

export const useTimeSlots = () => {
	const navigate = useNavigate();
	const { token, logout } = useAuth();
	const [timeSlots, setTimeSlots] = useState([]);

	const fetchDataTimeSlot = useCallback(
		async (date: string) => {
			if (!token) {
				logout();
				return;
			}
			if (Array.isArray(date)) return;

			try {
				const companyId = decodeToken(token);
				const timeSlots = await getAvaliableTimesSlots(
					companyId.id,
					date.split("T")[0]
				);
				setTimeSlots(timeSlots.data.availableTimes);
			} catch (error) {
				handleAuthError(error, logout, navigate);
				console.error("Erro ao buscar dados", error);
			}
		},
		[logout, navigate, token]
	);

	return {
		timeSlots,
		fetchDataTimeSlot,
		setTimeSlots,
	};
};
