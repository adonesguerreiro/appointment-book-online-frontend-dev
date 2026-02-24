import { api } from "@/shared/services/api";
import { FormDataCompany } from "../interface/FormDataCompany";
import { FormDataAddress } from "../interface/FormDataAddress";

export const getCompany = () => {
  return api.get(`/companies/id`);
};

export const updateCompany = (company: FormDataCompany) => {
  return api.put(`/companies`, company);
};

export const updateAddress = (addressId: number, address: FormDataAddress) => {
  return api.put(`/addresses/${addressId}`, address);
};
