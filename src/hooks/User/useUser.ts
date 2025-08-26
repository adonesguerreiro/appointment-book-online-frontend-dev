import { FormDataUser } from "./../../interface/FormDataUser";
import { useCallback } from "react";
import { getUserById } from "../../services/api";
import { UseFormReset } from "react-hook-form";
import { useAvatar } from "../useAvatar";

interface useUserProps {
	reset: UseFormReset<FormDataUser>;
}

export const useUser = ({ reset }: useUserProps) => {
	const { setInitialAvatar } = useAvatar();

	const fetchDataUser = useCallback(async () => {
		try {
			const { data } = await getUserById();
			reset({
				avatarUrl: data.avatarUrl,
				name: data.name,
				email: data.email,
			});
			if (data.avatarUrl) {
				setInitialAvatar(data.avatarUrl);
			}

			return data;
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	}, [reset, setInitialAvatar]);

	return {
		fetchDataUser,
	};
};
