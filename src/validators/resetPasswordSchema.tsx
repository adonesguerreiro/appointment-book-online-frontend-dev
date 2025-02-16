import * as yup from "yup";

export const resetPasswordSchema = yup.object({
	newPassword: yup
		.string()
		.required("Nova senha é obrigatória")
		.min(8, "Nova senha deve ter no mínimo 8 caracteres"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("newPassword")], "As senhas devem coincidir")
		.required("Confirmação da senha é obrigatória"),
});
