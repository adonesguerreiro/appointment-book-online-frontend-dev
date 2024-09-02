import * as yup from "yup";

export const scheduleSchema = yup.object().shape({
	customerId: yup.number().required("Cliente é obrigatório"),
	serviceId: yup.number().required("Serviço é obrigatório"),
	date: yup.string().required("Data é obrigatória"),
	status: yup.string().required("Status é obrigatório"),
});
