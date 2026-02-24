import { api } from "@/shared/services/api";
import { FormDataCustomer } from "../interface/FormDataCustomer";

export const getCustomers = (currentPage?: number) => {
  return api.get(`/customers`, {
    params: { page: currentPage, limit: 10 },
  });
};

export const getCustomerById = (customerId: number) => {
  return api.get(`/customers/${customerId}`);
};

export const createCustomer = (customer: FormDataCustomer) => {
  return api.post("/customers", customer);
};

export const updateCustomer = (
  customerId: number,
  customer: FormDataCustomer
) => {
  return api.put(`/customers/${customerId}`, customer);
};

export const deleteCustomer = (customerId: number) => {
  return api.delete(`/customers/${customerId}`);
};
