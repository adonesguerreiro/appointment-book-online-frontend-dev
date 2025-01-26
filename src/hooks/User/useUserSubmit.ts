import { useNavigate } from "react-router-dom";
import { useLoading } from "../useLoading";
import { useCustomToast } from "../useCustomToast";
import { useAuth } from "../useAuth";
import { updateUser } from "../../services/api";
import { useHandleError } from "../useHandleError";
import { FormDataUser } from "../../interface/FormDataUser";

export const useUserSubmit = () => {
	const { token } = useAuth();
	const handleError = useHandleError();
	const { showToast } = useCustomToast();
	const navigate = useNavigate();
	const { loading, setLoading } = useLoading();

	const handleSubmitUser = async (data: FormDataUser) => {
		setLoading(true);
		try {
			if (token) {
				const updatedUser = await updateUser(data);
				if (updatedUser.status === 200) {
					showToast({
						title: "Salvo com sucesso!",
						status: "success",
					});
					setLoading(false);
					navigate("/");
					return;
				}
			}
		} catch (error) {
			console.error("Erro ao salvar dados", error);
			handleError(error);
			setLoading(false);
			return;
		}
	};

	return { handleSubmitUser, loading };
};
