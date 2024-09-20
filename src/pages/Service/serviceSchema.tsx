import * as yup from "yup";

export const serviceSchema = yup.object().shape({
	id: yup.number().when("$isEditing", {
		is: true,
		then: (schema) => schema.required("Id é obrigatório"),
		otherwise: (schema) => schema.optional(),
	}),
	name: yup.string().required("Nome do serviço é obrigatório"),
	duration: yup.string().required("Duração do serviço é obrigatória"),
	price: yup
		.number()
		.required("Preço do serviço é obrigatório")
		.positive("Preço não pode ser zero"),
});
