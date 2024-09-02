import axios from "axios";
import { FormDataLogin } from "../interface/FormDataLogin";
import dotenv from "dotenv";

dotenv.config();

const api = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const auth = (auth: FormDataLogin) => {
	return api.post("/sessions", {
		email: auth.email,
		password: auth.password,
	});
};
