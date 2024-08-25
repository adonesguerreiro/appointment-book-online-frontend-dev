import * as yup from "yup";

export const unavaliableTimeSchema = yup.object().shape({
	date: yup.string().required("Data é obrigatória"),
	startTime: yup.string().required("Horário de início é obrigatório"),
	endTime: yup
		.string()
		.required("Horário final é obrigatório")
		.test(
			"validateTimeRange",
			"Horário final deve ser maior que o horário de início",
			(value, context) => {
				const startTime = context.parent?.startTime;

				if (!startTime) return false;

				return value.replace(":", "") > startTime.replace(":", "");
			}
		),
});
