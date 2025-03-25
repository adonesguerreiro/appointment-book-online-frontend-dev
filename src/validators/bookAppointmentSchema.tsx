import * as yup from "yup";

export const bookAppointmentSchema = yup.object().shape({
	customerName: yup.string().required("Nome é obrigatório"),
	mobile: yup.string().required("Celular é obrigatório"),
	serviceName: yup.string().required("Serviço é obrigatório"),
	calendar: yup.date().required("Data é obrigatória"),
	time: yup.string().required("Hora é obrigatória"),
});
