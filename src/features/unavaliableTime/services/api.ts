import { api } from "@/shared/services/api";
import { FormDataUnavailableTime } from "../interface/FormDataUnavailableTime";
import * as Sentry from "@sentry/react";

export const getUnavailableTimes = async (currentPage: number) => {
	try {
		const { data } = await api.get(`/unavaliable-times`, {
			params: { page: currentPage, limit: 10 },
		});
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error(error);
		throw error;
	}
};

export const getUnavailableTimeById = async (unavailableTimeId: number) => {
	try {
		const { data } = await api.get(`/unavaliable-times/${unavailableTimeId}`);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.log(error);
		throw error;
	}
};

export const createUnavailableTime = async (
	unavailableTime: FormDataUnavailableTime,
) => {
	try {
		const { data } = await api.post("/unavaliable-times", unavailableTime);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Error creating unavailable time:", error);
		throw error;
	}
};

export const updateUnavailableTime = async (
	unavailableTimeId: number,
	unavailableTime: FormDataUnavailableTime,
) => {
	try {
		const { data } = await api.put(
			`/unavaliable-times/${unavailableTimeId}`,
			unavailableTime,
		);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Error updating unavailable time:", error);
		throw error;
	}
};

export const deleteUnavailableTime = async (unavailableTimeId: number) => {
	try {
		const { data } = await api.delete(
			`/unavaliable-times/${unavailableTimeId}`,
		);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.error("Error deleting unavailable time:", error);
		throw error;
	}
};
