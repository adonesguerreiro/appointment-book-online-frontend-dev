import * as yup from "yup";
import {
	isValidCNPJ,
	isValidMobilePhone,
} from "@brazilian-utils/brazilian-utils";

export const companySchema = yup.object().shape({
	name: yup
		.string()
		.max(255, "Nome da empresa deve ter no máximo 255 caracteres")
		.required("Nome da empresa é obrigatório"),
	email: yup
		.string()
		.max(255, "E-mail deve ter no máximo 255 caracteres")
		.email("E-mail inválido")
		.required("E-mail é obrigatório"),
	mobile: yup
		.string()
		.max(15, "Celular deve ter no máximo 15 caracteres")
		.required("Celular é obrigatório")
		.transform((value) => value.replace(/[^\d]/g, ""))
		.test("validateMobile", "Celular é inválido.", (value) =>
			isValidMobilePhone(value)
		),
	cnpj: yup
		.string()
		.max(18, "CNPJ deve ter no máximo 18 caracteres")
		.required("CNPJ é obrigatório.")
		.transform((value) => value.replace(/[^\d]/g, ""))
		.test("validateDocument", "CNPJ é inválido.", (value) =>
			isValidCNPJ(value)
		),
	street: yup
		.string()
		.max(255, "Endereço deve ter no máximo 255 caracteres")
		.required("Endereço é obrigatório."),
	number: yup
		.string()
		.max(10, "Número deve ter no máximo 10 caracteres")
		.required("Número é obrigatório."),
	complement: yup
		.string()
		.max(255, "Complemento deve ter no máximo 255 caracteres"),
	neighborhood: yup
		.string()
		.max(255, "Bairro deve ter no máximo 255 caracteres")
		.required("Bairro é obrigatório."),
	city: yup
		.string()
		.max(255, "Cidade deve ter no máximo 255 caracteres")
		.optional(),
	state: yup
		.string()
		.max(2, "Estado deve ter no máximo 2 caracteres")
		.optional(),
	postalCode: yup
		.string()
		.max(8, "CEP deve ter no máximo 8 caracteres")
		.required("CEP é obrigatório.")
		.transform((value) => value.replace(/[^\d]/g, ""))
		.test(
			"validatePostalCode",
			"CEP incompleto",
			(value) => value.length === 8
		),
});
