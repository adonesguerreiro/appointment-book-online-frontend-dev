import { useCallback, useState } from "react";
import { PublicCompany } from "../../pages/BookAppointment";
import { publicGetCompany } from "../../services/api";
import { useParams } from "react-router-dom";
import { useLoading } from "../useLoading";

export const useBooking = () => {
	const [companyData, setCompanyData] = useState<PublicCompany | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const { loading, startLoading, stopLoading } = useLoading();

	const { slugCompany } = useParams();
	const fetchBooking = useCallback(async () => {
		try {
			startLoading();

			if (selectedDate) {
				const { data } = await publicGetCompany(slugCompany!, selectedDate);
				setCompanyData(data.timeSlots);
			} else {
				const { data } = await publicGetCompany(slugCompany!);
				setCompanyData(data.timeSlots);
			}
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [slugCompany, selectedDate, startLoading, stopLoading]);

	return {
		fetchBooking,
		companyData,
		selectedDate,
		setSelectedDate,
		loading,
	};
};
