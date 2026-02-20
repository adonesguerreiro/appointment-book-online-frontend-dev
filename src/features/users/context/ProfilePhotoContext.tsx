import { createContext } from "react";

interface ProfilePhotoContextType {
	profilePhoto: File;
	setProfilePhoto: (profilePhoto: File) => void;
	handleSetProfilePhoto: (file: File) => void;
}

export const ProfilePhotoContext = createContext<
	ProfilePhotoContextType | undefined
>(undefined);
