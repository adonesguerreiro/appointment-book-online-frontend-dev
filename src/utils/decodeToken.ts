import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../interface/CustomJwtPayload";

export const decodeToken = (token: string): CustomJwtPayload => {
	const decoded = jwtDecode<CustomJwtPayload>(token);
	return decoded;
};
