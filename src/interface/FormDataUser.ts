export interface FormDataUser {
	avatarUrl?: File | string | null;
	name: string;
	email: string;
	password: string;
	newPassword?: string;
	confirmPassword?: string;
	blocked?: boolean;
}
