import { createContext } from "react";

interface AvatarContextType {
	avatar: File | string;
	setAvatar: (avatar: File | string) => void;
	setInitialAvatar: (url: string) => void;
}

export const AvatarContext = createContext<AvatarContextType | undefined>(
	undefined
);
