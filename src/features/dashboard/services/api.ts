import { api } from "@/shared/services/api";

export const getDashboard = (month?: string, year?: string) => {
  return api.get(`/dashboard/month/${month}/year/${year}`);
};
