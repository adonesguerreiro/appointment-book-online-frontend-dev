import { FormDataUser } from "./../../interface/FormDataUser";
import { useCallback } from "react";
import { useAuth } from "../useAuth";
import { getUserById } from "../../services/api";
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
			const { data } = await getUserById();
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
