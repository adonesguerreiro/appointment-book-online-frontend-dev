import { api } from "@/shared/services/api";
import { FormDataUser } from "../interface/FormDataUser";
import * as Sentry from "@sentry/react";

export const updateUpload = async (data: FormData) => {
	try {
		const response = await api.put("/upload", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Error updating upload:", error);
		throw error;
	}
};

export const getUserById = async () => {
	try {
		const { data } = await api.get("/users/:id");
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Error fetching user:", error);
		throw error;
	}
};

export const updateUser = async (user: FormDataUser) => {
	try {
		const { data } = await api.put(`/users`, user);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Error updating user:", error);
		throw error;
	}
};
