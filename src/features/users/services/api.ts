import { api } from "@/shared/services/api";
import { FormDataUser } from "../interface/FormDataUser";

export const updateUpload = (data: FormData) => {
	return api.put("/upload", data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const getUserById = async () => {
	try {
		const { data } = await api.get("/users/id");
		return data;
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
};

export const updateUser = (user: FormDataUser) => {
	return api.put(`/users`, user);
};
