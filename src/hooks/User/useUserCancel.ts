import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormDataUser } from "../../interface/FormDataUser";
import { userSchema } from "../../validators/userSchema";

export const useUserCancel = () => {
	const { reset } = useForm<FormDataUser>({
		resolver: yupResolver(userSchema),
	});
	const navigate = useNavigate();

	const handleCancel = () => {
		reset();
		navigate("/");
	};

	return { handleCancel };
};
