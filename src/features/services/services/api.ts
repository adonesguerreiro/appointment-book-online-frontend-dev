import { api } from "@/shared/services/api";
import { FormDataService } from "../interface/FormDataService";

export const getServices = (currentPage?: number) => {
  return api.get(`/services`, {
    params: { page: currentPage, limit: 10 },
  });
};

export const getServicesById = (serviceId: number) => {
  return api.get(`/services/${serviceId}`);
};

export const createService = (service: FormDataService) => {
  return api.post("/services", service);
};

export const updateService = (serviceId: number, service: FormDataService) => {
  return api.put(`/services/${serviceId}`, service);
};

export const deleteService = (serviceId: number) => {
  return api.delete(`/services/${serviceId}`);
};
