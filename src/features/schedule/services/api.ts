import { api } from "@/shared/services/api";
import { FormDataSchedule } from "../interface/FormDataSchedule";

export const getSchedules = async (currentPage: number) => {
  return api.get(`/schedules`, {
    params: { page: currentPage, limit: 10 },
  });
};

export const getScheduleById = (scheduleId: number) => {
  return api.get(`/schedules/${scheduleId}`);
};

export const createSchedule = (schedule: FormDataSchedule) => {
  return api.post("/schedules", schedule);
};

export const updateSchedule = (
  scheduleId: number,
  schedule: FormDataSchedule
) => {
  return api.put(`/schedules/${scheduleId}`, schedule);
};

export const deleteService = (serviceId: number) => {
  return api.delete(`/services/${serviceId}`);
};
