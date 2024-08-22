import { FormDataAddress } from "./FormDataAdress";

export interface FormDataCompany extends FormDataAddress {
	name: string;
	email: string;
	mobile: string;
	cnpj: string;
}
