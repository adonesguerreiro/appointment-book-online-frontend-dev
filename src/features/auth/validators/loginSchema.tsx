import * as yup from "yup";

export const loginSchema = yup.object({
	email: yup
		.string()
		.email("Email deve ser válido")
		.required("Email é obrigatório"),
	password: yup
		.string()
		.required("Senha é obrigatório")
		.min(8, "Senha deve ter no mínimo 8 dígitos"),
});
