import { api } from "@/shared/services/api";
import { BookingAppointmentData } from "../interface/BookingAppointmentData";

export const publicGetCompany = (
  slugCompany: string,
  date?: Date,
  currentPage?: number
) => {
  return api.get(`/public/${slugCompany}?date=${date}`, {
    params: { page: currentPage, limit: 10 },
  });
};

export const publicBookAppointment = (
  bookingData: BookingAppointmentData,
  slugCompany: string
) => {
  return api.post(`/public/booking/${slugCompany}`, bookingData);
};
