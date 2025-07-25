import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils";
import * as yup from "yup";

export const customerSchema = yup.object().shape({
	id: yup.number().when("$isEditing", {
		is: true,
		then: (schema) => schema.required("Id é obrigatório"),
		otherwise: (schema) => schema.optional(),
	}),
	customerName: yup
		.string()
		.max(255, "Nome do cliente deve ter no máximo 255 caracteres")
		.required("Nome do cliente é obrigatório"),
	mobile: yup
		.string()
		.required("Número do celular é obrigatório")
		.test("is-valid-mobile", "Número de celular inválido", (value) =>
			isValidMobilePhone(value)
		),
});
