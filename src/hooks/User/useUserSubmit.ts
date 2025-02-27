import { useNavigate } from "react-router-dom";
import { useLoading } from "../useLoading";
import { useCustomToast } from "../useCustomToast";
import { useAuth } from "../useAuth";
import { updateUpload, updateUser } from "../../services/api";
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
				const formData = new FormData();
				formData.append("name", data.name);
				formData.append("email", data.email);
				formData.append("password", data.password || "");
				if (data.avatarUrl instanceof File) {
					formData.append("avatarUrl", data.avatarUrl);
				}

				const updatedUser = await updateUser(data);
				const updateUploadUser = await updateUpload(formData);

				if (updatedUser.status === 200 && updateUploadUser.status === 200) {
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
