import { FormDataLogin } from "./FormDataLogin";

export interface FormDataUser extends FormDataLogin {
	name: string;
	newPassword?: string;
	confirmPassword?: string;
	avatarUrl?: File | string;
}
