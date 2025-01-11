import * as yup from "yup";

export const scheduleSchema = yup.object().shape({
	id: yup.number().when("$isEditing", {
		is: true,
		then: (schema) => schema.required("Id é obrigatório"),
		otherwise: (schema) => schema.optional(),
	}),
	customerId: yup.string().required("Nome do cliente é obrigatório"),
	customerName: yup.string().optional(),
	serviceId: yup.string().required("Nome do serviço é obrigatório"),
	serviceName: yup.string().optional(),
	date: yup.string().required("Data é obrigatória"),
	timeSlotAvailable: yup
		.string()
		.required("Horário é obrigatório")
		.test("valid-service", "Selecione um horário válido", function (value) {
			return value !== "Sem horários disponíveis";
		}),
	availableTimeSlot: yup.array().optional(),
	status: yup.string().required("Status é obrigatório"),
});
