import { api } from "@/shared/services/api";
import { FormDataAvailableTime } from "../interface/FormDataAvailableTime";
import * as Sentry from "@sentry/react";

export const getAvaliableTimes = async (currentPage: number) => {
	try {
		const { data } = await api.get(`/avaliable-times`, {
			params: { page: currentPage, limit: 10 },
		});
		return data;
	} catch (error) {
		console.log(error);
		Sentry.captureException(error);
		throw error;
	}
};

export const getAvaliableTimesSlots = async (
	date: string,
	scheduleId?: number,
) => {
	try {
		const url = scheduleId
			? `/avaliable-times/${date}?excludeScheduleId=${scheduleId}`
			: `/avaliable-times/${date}`;
		const { data } = await api.get(url);
		return data;
	} catch (error) {
		console.log(error);
		Sentry.captureException(error);
		throw error;
	}
};

export const getAvaliableTimeById = async (avaliableTimeId: number) => {
	try {
		const { data } = await api.get(`/avaliable-times/${avaliableTimeId}`);
		return data;
	} catch (error) {
		console.log(error);
		Sentry.captureException(error);
		throw error;
	}
};

export const createAvaliableTime = async (
	avalibleTime: FormDataAvailableTime,
) => {
	try {
		await api.post("/avaliable-times", avalibleTime);
	} catch (error) {
		console.log(error);
		Sentry.captureException(error);
		throw error;
	}
};

export const updateAvaliableTime = async (
	avaliableTimeId: number,
	avalibleTime: FormDataAvailableTime,
) => {
	try {
		await api.put(`/avaliable-times/${avaliableTimeId}`, avalibleTime);
	} catch (error) {
		console.log(error);
		Sentry.captureException(error);
		throw error;
	}
};

export const deleteAvaliableTime = async (avaliableTimeId: number) => {
	try {
		await api.delete(`/avaliable-times/${avaliableTimeId}`);
	} catch (error) {
		console.log(error);
		Sentry.captureException(error);
		throw error;
	}
};
