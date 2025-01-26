import { FormDataUser } from "./../../interface/FormDataUser";
import { useCallback } from "react";
import { useAuth } from "../useAuth";
import { getUser } from "../../services/api";
import { decodeToken } from "../../utils/decodeToken";
import { UseFormReset } from "react-hook-form";

interface useUserProps {
	reset: UseFormReset<FormDataUser>;
}

export const useUser = ({ reset }: useUserProps) => {
	const { token } = useAuth();

	const fetchDataUser = useCallback(async () => {
		if (!token) {
			return;
		}

		try {
			const userId = decodeToken(token);
			const { data } = await getUser(userId.id);
			reset({
				name: data.name,
				email: data.email,
			});

			return data;
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	}, [reset, token]);

	return {
		fetchDataUser,
	};
};
