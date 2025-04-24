import { useNavigate } from "react-router-dom";
import { useLoading } from "../useLoading";
import { useCustomToast } from "../useCustomToast";
import { useAuth } from "../useAuth";
import { updateUpload, updateUser } from "../../services/api";
import { useHandleError } from "../useHandleError";
import { FormDataUser } from "../../interface/FormDataUser";
import { useProfilePhoto } from "../useProfilePhoto";

export const useUserSubmit = () => {
	const { token } = useAuth();
	const handleError = useHandleError();
	const { showToast } = useCustomToast();
	const navigate = useNavigate();
	const { loading, setLoading } = useLoading();
	const { profilePhoto } = useProfilePhoto();

	const handleSubmitUser = async (data: FormDataUser) => {
		setLoading(true);
		try {
			if (token) {
				const formData = new FormData();
				formData.append("name", data.name);
				formData.append("email", data.email);
				formData.append("password", data.password || "");
				data.avatarUrl = profilePhoto;
				if (data.avatarUrl instanceof File) {
					formData.append("avatarUrl", data.avatarUrl);
				}
				console.log([...formData.entries()]);

				const updateUploadUser = await updateUpload(formData);
				const updatedUser = await updateUser(data);

				if (updatedUser.status === 200 || updateUploadUser?.status === 200) {
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
