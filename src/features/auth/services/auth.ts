import { api } from "@/shared/services/api";
import { FormDataForgotPassword } from "../interface/FormDataForgotPassword";
import { FormDataResetPassword } from "../interface/FormDataResetPassword";
import { FormDataLogin } from "../interface/FormDataLogin";

export const auth = (auth: FormDataLogin) => {
	return api.post("/sessions", {
		email: auth.email,
		password: auth.password,
	});
};

export const authMe = () => {
	return api.get("/session-me");
};

export const logout = () => {
	return api.post("/logout");
};

export const refreshToken = () => {
	return api.post("/refresh-token");
};

export const forgotPassword = ({ email }: FormDataForgotPassword) => {
	return api.post("/forgot-password", { email });
};

export const resetPassword = (token: string, data: FormDataResetPassword) => {
	return api.post(`/reset-password?token=${token}`, {
		newPassword: data.newPassword,
	});
};
