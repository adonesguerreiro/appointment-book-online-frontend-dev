import * as yup from "yup";

export const availableTimeSchema = yup.object().shape({
	day: yup.string().required("Dia é obrigatório"),
	period: yup
		.string()
		.required("Período é obrigatório")
		.test("valid-period", function (value) {
			const { startTime, endTime } = this.parent;

			const startTimeDate = new Date(`1970-01-01T${startTime}:00Z`);
			const endTimeDate = new Date(`1970-01-01T${endTime}:00Z`);

			if (
				value === "MORNING" &&
				startTimeDate >= new Date(`1970-01-01T01:00:00Z`) &&
				endTimeDate <= new Date(`1970-01-01T12:59:00Z`)
			) {
				return true;
			} else if (
				value === "AFTERNOON" &&
				startTimeDate >= new Date(`1970-01-01T13:00:00Z`) &&
				endTimeDate <= new Date(`1970-01-01T18:59:00Z`)
			) {
				return true;
			} else if (
				value === "EVENING" &&
				startTimeDate >= new Date(`1970-01-01T19:00:00Z`) &&
				endTimeDate <= new Date(`1970-01-01T23:59:00Z`)
			) {
				return true;
			}

			return this.createError({
				message: "Horário não corresponde ao período informado",
			});
		}),
	startTime: yup
		.string()
		.required("Horário de início é obrigatório")
		.test(
			"validateTime",
			"Horário de início não pode ser maior que 23:59",
			(value) => {
				const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
				return timeRegex.test(value);
			}
		),
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
		)
		.test(
			"validateTime",
			"Horário final não pode ser maior que 23:59",
			(value) => {
				const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
				return timeRegex.test(value);
			}
		),
	interval: yup
		.number()
		.required("Intervalo é obrigatório")
		.min(1, "Intervalo não pode ser igual a zero")
		.positive("Intervalo menor que zero")
		.transform((value, originalValue) => {
			return originalValue === "" ? null : value;
		}),
});
