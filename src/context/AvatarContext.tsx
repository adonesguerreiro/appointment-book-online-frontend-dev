import React from "react";
import { createContext } from "react";

interface AvatarContextType {
	avatar: File | string;
	setAvatar: (avatar: File | string) => void;
	setInitialAvatar: (url: string) => void;
}

export const AvatarContext = createContext<AvatarContextType | undefined>(
	undefined
);

export function AvatarProvider({ children }: { children: React.ReactNode }) {
	const [avatar, setAvatar] = React.useState<File | string>("");

	const setInitialAvatar = (url: string) => {
		if (!avatar) setAvatar(url);
	};

	return (
		<AvatarContext.Provider value={{ avatar, setAvatar, setInitialAvatar }}>
			{children}
		</AvatarContext.Provider>
	);
}
