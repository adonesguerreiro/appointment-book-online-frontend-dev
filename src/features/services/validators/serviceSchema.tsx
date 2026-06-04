import * as yup from "yup";
import { FormDataService } from "../interface/FormDataService";

export const serviceSchema: yup.ObjectSchema<FormDataService> = yup
	.object()
	.shape({
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
			.required("Duração é obrigatória")
			.min(0, "Duração deve ser maior que zero")
			.required("Duração é obrigatória")
			.matches(
				/^([01][0-9]|2[0-3]):([0-5][0-9])$/,
				"Formato de duração inválido",
			),

		price: yup
			.number()
			.max(999999.99, "Preço máximo é R$ 999.999,99")
			.required("Preço do serviço é obrigatório")
			.positive("Preço não pode ser zero"),
	});
