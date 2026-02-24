import { api } from "@/shared/services/api";
import { FormDataUnavailableTime } from "../interface/FormDataUnavailableTime";

export const getUnavailableTimes = (currentPage: number) => {
  return api.get(`/unavaliable-times`, {
    params: { page: currentPage, limit: 10 },
  });
};

export const getUnavailableTimeById = (unavailableTimeId: number) => {
  return api.get(`/unavaliable-times/${unavailableTimeId}`);
};

export const createUnavailableTime = (
  unavailableTime: FormDataUnavailableTime
) => {
  return api.post("/unavaliable-times", unavailableTime);
};

export const updateUnavailableTime = (
  unavailableTimeId: number,
  unavailableTime: FormDataUnavailableTime
) => {
  return api.put(`/unavaliable-times/${unavailableTimeId}`, unavailableTime);
};

export const deleteUnavailableTime = (unavailableTimeId: number) => {
  return api.delete(`/unavaliable-times/${unavailableTimeId}`);
};

export default api;
