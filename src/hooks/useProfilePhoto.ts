import React from "react";
import { ProfilePhotoContext } from "../context/ProfilePhotoContext";

export function useProfilePhoto() {
	const context = React.useContext(ProfilePhotoContext);
	if (!context) {
		throw new Error(
			"useProfilePhoto must be used within an ProfilePhotoProvider"
		);
	}
	return context;
}
