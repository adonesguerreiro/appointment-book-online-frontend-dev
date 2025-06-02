import * as yup from "yup";

export const userSchema = yup.object().shape({
	name: yup
		.string()
		.max(255, "Nome não pode ter mais de 255 caracteres")
		.required("Nome é obrigatório"),
	email: yup
		.string()
		.max(255, "E-mail não pode ter mais 255 caracteres")
		.email()
		.required("E-mail é obrigatório"),
	password: yup
		.string()
		.max(255, "Senha não pode ter mais de 255 caracteres")
		.required("Senha é obrigatório"),
	newPassword: yup
		.string()
		.max(255, "Nova senha não pode ter mais de 255 caracteres"),
	confirmPassword: yup
		.string()
		.max(255, "Confirmação de senha não pode ter mais de 255 caracteres")
		.oneOf([yup.ref("newPassword")], "As senhas devem coincidir"),
	avatar: yup.string().optional(),
});
