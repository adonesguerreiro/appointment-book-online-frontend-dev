import { useCallback } from "react";
import { UseFormReset } from "react-hook-form";
import { BookingAppointmentData } from "../../pages/BookAppointment";
import { publicBookAppointment } from "../../services/api";
import { useCustomToast } from "../useCustomToast";
import { useParams } from "react-router-dom";

export const useBookingSubmit = (
	reset: UseFormReset<BookingAppointmentData>,
	fetchBooking: () => Promise<void>
) => {
	const { showToast } = useCustomToast();
	const { slugCompany } = useParams();

	const handleSubmitBooking = useCallback(
		async (bookingData: BookingAppointmentData) => {
			try {
				const bookingCreated = await publicBookAppointment(
					bookingData,
					slugCompany!
				);
				if (bookingCreated.status === 200) {
					showToast({
						title: "Agendamento realizado com sucesso.",
						status: "success",
					});
					await fetchBooking();
					reset({
						customerName: "",
						customerPhone: "",
						serviceId: "",
						calendar: new Date(),
						time: "",
					});
				}
			} catch (error) {
				console.error("Erro ao agendar horário", error);
			}
		},
		[fetchBooking, reset, showToast, slugCompany]
	);

	return {
		handleSubmitBooking,
	};
};
