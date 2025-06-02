import { FormDataLogin } from "./FormDataLogin";

export interface FormDataUser extends Partial<FormDataLogin> {
	name?: string;
	newPassword?: string;
	confirmPassword?: string;
	avatarUrl?: File | string;
	blocked?: boolean;
}
