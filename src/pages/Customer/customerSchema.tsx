import * as yup from "yup";

export const customerSchema = yup.object().shape({
	id: yup.number().when("$isEditing", {
		is: true,
		then: (schema) => schema.required("Id é obrigatório"),
		otherwise: (schema) => schema.optional(),
	}),
	customerName: yup.string().required("Nome do cliente é obrigatório"),
	mobile: yup.string().required("Número do celular é obrigatório"),
});
