import { api } from "@/shared/services/api";
import { FormDataAvailableTime } from "../interface/FormDataAvailableTime";

export const getAvaliableTimes = (currentPage: number) => {
  return api.get(`/avaliable-times`, {
    params: { page: currentPage, limit: 10 },
  });
};

export const getAvaliableTimesSlots = (date: string) => {
  return api.get(`/avaliable-times?date=${date}`);
};

export const getAvaliableTimeById = (avaliableTimeId: number) => {
  return api.get(`/avaliable-times/${avaliableTimeId}`);
};

export const createAvaliableTime = (avalibleTime: FormDataAvailableTime) => {
  return api.post("/avaliable-times", avalibleTime);
};

export const updateAvaliableTime = (
  avaliableTimeId: number,
  avalibleTime: FormDataAvailableTime
) => {
  return api.put(`/avaliable-times/${avaliableTimeId}`, avalibleTime);
};

export const deleteAvaliableTime = (avaliableTimeId: number) => {
  return api.delete(`/avaliable-times/${avaliableTimeId}`);
};
