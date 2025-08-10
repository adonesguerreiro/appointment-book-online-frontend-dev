export interface FormDataUser {
	email: string;
	password: string;
	name: string;
	newPassword?: string;
	confirmPassword?: string;
	avatarUrl?: File | string;
	blocked?: boolean;
}
