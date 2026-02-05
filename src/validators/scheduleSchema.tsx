import * as yup from "yup";
import { FormDataSchedule } from "../interface/FormDataSchedule";

export const scheduleSchema: yup.ObjectSchema<FormDataSchedule> = yup.object({
	id: yup.number().when("$isEditing", {
		is: true,
		then: (schema) => schema.required("Id é obrigatório"),
		otherwise: (schema) => schema.optional(),
	}),
	customerId: yup.string().required("Nome do cliente é obrigatório"),
	serviceId: yup.string().required("Nome do serviço é obrigatório"),
	date: yup.string().required("Data é obrigatória"),
	timeSlotAvaliable: yup.string().required("Horário disponível é obrigatório"),
	avaliableTimeSlot: yup.array().optional(),
	status: yup.string().required("Status é obrigatório"),
});
