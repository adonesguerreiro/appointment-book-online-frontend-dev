import { api } from "@/shared/services/api";
import { FormDataUser } from "../interface/FormDataUser";

export const updateUpload = (data: FormData) => {
  return api.put("/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserById = () => {
  return api.get(`/users/id`);
};

export const updateUser = (user: FormDataUser) => {
  return api.put(`/users`, user);
};
