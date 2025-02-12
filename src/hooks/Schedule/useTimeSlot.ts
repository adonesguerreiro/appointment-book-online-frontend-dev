import { useCallback, useState } from "react";
import { useAuth } from "../useAuth";
import { getAvaliableTimesSlots } from "../../services/api";
import { handleAuthError } from "../../utils/handleAuthError";
import { useNavigate } from "react-router-dom";

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
				const timeSlots = await getAvaliableTimesSlots(date.split("T")[0]);
				setTimeSlots(timeSlots.data.avaliableTimes);
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
