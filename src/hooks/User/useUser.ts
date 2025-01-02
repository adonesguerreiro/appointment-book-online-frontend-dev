import { useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUser } from "../../services/api";
import { decodeToken } from "../../utils/decodeToken";

export const useUser = () => {
	const { token } = useAuth();

	const fetchDataUser = useCallback(async () => {
		if (!token) {
			return;
		}

		try {
			const userId = decodeToken(token);
			const { data } = await getUser(userId.id);

			return data;
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	}, [token]);

	return {
		fetchDataUser,
	};
};
