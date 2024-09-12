import * as yup from "yup";
import {
	isValidCNPJ,
	isValidMobilePhone,
} from "@brazilian-utils/brazilian-utils";

export const companySchema = yup.object().shape({
	name: yup.string().required("Nome da empresa é obrigatório"),
	email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
	mobile: yup
		.string()
		.required("Celular é obrigatório")
		.transform((value) => value.replace(/[^\d]/g, ""))
		.test("validateMobile", "Celular é inválido.", (value) =>
			isValidMobilePhone(value)
		),
	cnpj: yup
		.string()
		.required("CNPJ é obrigatório.")
		.transform((value) => value.replace(/[^\d]/g, ""))
		.test("validateDocument", "CNPJ é inválido.", (value) =>
			isValidCNPJ(value)
		),
	street: yup.string().required("Endereço é obrigatório."),
	number: yup.string().required("Número é obrigatório."),
	complement: yup.string(),
	neighborhood: yup.string().required("Bairro é obrigatório."),
	city: yup.string().required("Cidade é obrigatório."),
	state: yup.string().required("Estado é obrigatório."),
	postalCode: yup
		.string()
		.required("CEP é obrigatório.")
		.transform((value) => value.replace(/[^\d]/g, ""))
		.test("validatePostalCode", "CEP inválido", (value) => value.length === 8),
});
