import axios from "axios";
import { BookingAppointmentData } from "../interface/BookingAppointmentData";
import * as Sentry from "@sentry/react";

export const publicApi = axios.create({
	baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

export const publicGetCompany = async (
	slugCompany: string,
	date?: Date,
	currentPage?: number,
) => {
	try {
		const { data } = await publicApi.get(
			`/public/${slugCompany}?date=${date}`,
			{
				params: { page: currentPage, limit: 10 },
			},
		);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		throw error;
	}
};

export const publicGetService = async (
	slugCompany: string,
	currentPage?: number,
) => {
	try {
		const { data } = await publicApi.get(`/public/service/${slugCompany}`, {
			params: { page: currentPage, limit: 10 },
		});
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.log(error);
		throw error;
	}
};

export const publicGetUser = async (slugCompany: string) => {
	try {
		const { data } = await publicApi.get(`/public/user/${slugCompany}`);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.log(error);
		throw error;
	}
};

export const publicBookAppointment = async (
	bookingData: BookingAppointmentData,
	slugCompany: string,
) => {
	try {
		const { data } = await publicApi.post(
			`/public/booking/${slugCompany}`,
			bookingData,
		);
		return data;
	} catch (error) {
		Sentry.captureException(error);
		console.log(error);
		throw error;
	}
};
