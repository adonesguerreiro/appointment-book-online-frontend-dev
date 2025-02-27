import * as yup from "yup";

export const userSchema = yup.object().shape({
	name: yup.string().required("Nome é obrigatório"),
	email: yup.string().email().required("E-mail é obrigatório"),
	password: yup.string().required("Senha é obrigatório"),
	newPassword: yup.string(),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("newPassword")], "As senhas devem coincidir"),
	avatar: yup.string().optional(),
});
