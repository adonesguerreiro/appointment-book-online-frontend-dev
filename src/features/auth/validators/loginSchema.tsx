import * as yup from "yup";

export const loginSchema = yup.object({
	email: yup
		.string()
		.email("Email deve ser válido")
		.required("Email é obrigatório"),
	password: yup
		.string()
		.min(8, "Senha deve ter no mínimo 8 caracteres")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
			"Senha deve ter mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial",
		)
		.required("Senha é obrigatória"),
});
