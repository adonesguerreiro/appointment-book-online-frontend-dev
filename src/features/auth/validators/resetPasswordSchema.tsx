import * as yup from "yup";

export const resetPasswordSchema = yup.object({
	newPassword: yup
		.string()
		.required("Nova senha é obrigatória")
		.min(8, "Nova senha deve ter no mínimo 8 caracteres")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			"Nova senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("newPassword")], "As senhas devem coincidir")
		.required("Confirmação da senha é obrigatória")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			"Confirmação da senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
		),
});
