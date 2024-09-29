import * as yup from "yup";

export const scheduleSchema = yup.object().shape({
	id: yup.number().when("$isEditing", {
		is: true,
		then: (schema) => schema.required("Id é obrigatório"),
		otherwise: (schema) => schema.optional(),
	}),
	customerId: yup.number().required("Id do cliente é obrigatório"),
	customerName: yup.string().required("Nome do cliente é obrigatório"),
	serviceId: yup.number().required("Id do serviço é obrigatório"),
	serviceName: yup.string().required("Nome do serviço é obrigatório"),
	date: yup.string().required("Data é obrigatória"),
	status: yup.string().required("Status é obrigatório"),
});
