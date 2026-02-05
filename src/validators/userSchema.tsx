import * as yup from "yup";
import { FormDataUser } from "../interface/FormDataUser";

export const userSchema: yup.ObjectSchema<FormDataUser> = yup.object({
	avatarUrl: yup.mixed<File | string>().nullable().optional(),
	name: yup
		.string()
		.trim()
		.max(255, "Nome não pode ter mais de 255 caracteres")
		.required("Nome é obrigatório"),

	email: yup
		.string()
		.trim()
		.lowercase()
		.max(255, "E-mail não pode ter mais 255 caracteres")
		.email("E-mail inválido")
		.required("E-mail é obrigatório"),

	password: yup
		.string()
		.min(8, "Senha deve ter no mínimo 8 caracteres")
		.max(255, "Senha não pode ter mais de 255 caracteres")
		.required("Senha é obrigatório"),

	newPassword: yup
		.string()
		.min(8, "Nova senha deve ter no mínimo 8 caracteres")
		.max(255, "Nova senha não pode ter mais de 255 caracteres")
		.optional(),

	confirmPassword: yup
		.string()
		.max(255, "Confirmação de senha não pode ter mais de 255 caracteres")
		.oneOf([yup.ref("newPassword")], "As senhas devem coincidir")
		.when("newPassword", {
			is: (value: string) => value && value.length > 0,
			then: (schema) => schema.required("Confirme a nova senha"),
			otherwise: (schema) => schema.optional(),
		}),

	blocked: yup.boolean().optional(),
});
