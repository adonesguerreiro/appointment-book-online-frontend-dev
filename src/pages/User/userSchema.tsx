import * as yup from "yup";

export const userSchema = yup.object().shape({
	name: yup.string().required("Nome é obrigatório"),
	email: yup.string().email().required("E-mail é obrigatório"),
	password: yup.string().required("Senha é obrigatório"),
	newPassword: yup
		.string()
		.required("Nova senha é obrigatória")
		.min(8, "Senha deve ter no mínimo oito caracteres"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("newPassword")], "As senhas não conferem")
		.required("Confirmar nova senha é obrigatória"),
});
