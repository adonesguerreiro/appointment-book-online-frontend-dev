import { FormDataAddress } from "./FormDataAddress";

export interface FormDataCompany extends FormDataAddress {
	name: string;
	email: string;
	mobile: string;
	cnpj: string;
}
