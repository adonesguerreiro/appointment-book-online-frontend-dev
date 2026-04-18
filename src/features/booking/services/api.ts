import axios from "axios";
import { BookingAppointmentData } from "../interface/BookingAppointmentData";

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
		console.log(error);
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
		console.log(error);
	}
};

export const publicGetUser = async (slugCompany: string) => {
	try {
		const { data } = await publicApi.get(`/public/user/${slugCompany}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const publicBookAppointment = (
	bookingData: BookingAppointmentData,
	slugCompany: string,
) => {
	return publicApi.post(`/public/booking/${slugCompany}`, bookingData);
};
