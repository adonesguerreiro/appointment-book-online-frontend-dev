import { FormDataCustomer } from "@/features/customer/interface/FormDataCustomer";
import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils";
import * as yup from "yup";

export const customerSchema : yup.ObjectSchema<FormDataCustomer> = yup.object().shape({
	id: yup.number().required(),
	customerName: yup
		.string()
		.max(255, "Nome do cliente deve ter no máximo 255 caracteres")
		.required("Nome do cliente é obrigatório"),
	mobile: yup
		.string()
		.required("Número do celular é obrigatório")
		.test("is-valid-mobile", "Número de celular inválido", (value) =>
			isValidMobilePhone(value)
		),
});
