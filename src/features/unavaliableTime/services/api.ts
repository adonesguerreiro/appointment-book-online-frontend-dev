import { api } from "@/shared/services/api";
import { FormDataUnavailableTime } from "../interface/FormDataUnavailableTime";

export const getUnavailableTimes = async (currentPage: number) => {
	try {
		const { data } = await api.get(`/unavaliable-times`, {
			params: { page: currentPage, limit: 10 },
		});
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getUnavailableTimeById = async (unavailableTimeId: number) => {
	try {
		const { data } = await api.get(`/unavaliable-times/${unavailableTimeId}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const createUnavailableTime = (
	unavailableTime: FormDataUnavailableTime,
) => {
	return api.post("/unavaliable-times", unavailableTime);
};

export const updateUnavailableTime = (
	unavailableTimeId: number,
	unavailableTime: FormDataUnavailableTime,
) => {
	return api.put(`/unavaliable-times/${unavailableTimeId}`, unavailableTime);
};

export const deleteUnavailableTime = (unavailableTimeId: number) => {
	return api.delete(`/unavaliable-times/${unavailableTimeId}`);
};

export default api;
