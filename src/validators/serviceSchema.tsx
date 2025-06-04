import * as yup from "yup";

export const serviceSchema = yup.object().shape({
	id: yup.number().when("$isEditing", {
		is: true,
		then: (schema) => schema.required("Id é obrigatório"),
		otherwise: (schema) => schema.optional(),
	}),
	serviceName: yup
		.string()
		.max(255, "Nome do serviço deve ter no máximo 255 caracteres")
		.required("Nome do serviço é obrigatório"),
	duration: yup
		.string()
		.max(255, "Duração do serviço deve ter no máximo 255 caracteres")
		.required("Duração do serviço é obrigatória"),
	price: yup
		.number()
		.max(999999.99, "Preço máximo é R$ 999.999,99")
		.required("Preço do serviço é obrigatório")
		.positive("Preço não pode ser zero"),
});
