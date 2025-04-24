import React from "react";
import { ProfilePhotoContext as Profile } from "./ProfilePhotoContext";

export function ProfilePhotoProvider({ children }: { children: React.ReactNode }) {
	const [profilePhoto, setProfilePhoto] = React.useState<File>(
		new File([], "")
	);
	const handleSetProfilePhoto = (file: File) => {
		setProfilePhoto(file);
	};

	return (
		<Profile.Provider
			value={{ profilePhoto, setProfilePhoto, handleSetProfilePhoto }}>
			{children}
		</Profile.Provider>
	);
}
