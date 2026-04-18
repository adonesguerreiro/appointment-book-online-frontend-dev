import { FormDataUser } from "../interface/FormDataUser";
import { useCallback } from "react";
import { getUserById } from "../services/api";
import { UseFormReset } from "react-hook-form";
import { useAvatar } from "./useAvatar";

interface useUserProps {
	reset: UseFormReset<FormDataUser>;
}

export const useUser = ({ reset }: useUserProps) => {
	const { setInitialAvatar } = useAvatar();

	const fetchDataUser = useCallback(async () => {
		try {
			const user = await getUserById();
			console.log(user);
			reset({
				avatarUrl: user.avatarUrl,
				name: user.name,
				email: user.email,
			});
			if (user.avatarUrl) {
				setInitialAvatar(user.avatarUrl);
			}

			return user;
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	}, [reset, setInitialAvatar]);

	return {
		fetchDataUser,
	};
};
