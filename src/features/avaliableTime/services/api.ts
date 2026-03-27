import { api } from "@/shared/services/api";
import { FormDataAvailableTime } from "../interface/FormDataAvailableTime";

export const getAvaliableTimes = async (currentPage: number) => {
	try {
		const { data } = await api.get(`/avaliable-times`, {
			params: { page: currentPage, limit: 10 },
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getAvaliableTimesSlots = async (date: string) => {
	try {
		const { data } = await api.get(`/avaliable-times?date=${date}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getAvaliableTimeById = async (avaliableTimeId: number) => {
	try {
		const { data } = await api.get(`/avaliable-times/${avaliableTimeId}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const createAvaliableTime = (avalibleTime: FormDataAvailableTime) => {
	return api.post("/avaliable-times", avalibleTime);
};

export const updateAvaliableTime = (
	avaliableTimeId: number,
	avalibleTime: FormDataAvailableTime,
) => {
	return api.put(`/avaliable-times/${avaliableTimeId}`, avalibleTime);
};

export const deleteAvaliableTime = (avaliableTimeId: number) => {
	return api.delete(`/avaliable-times/${avaliableTimeId}`);
};
