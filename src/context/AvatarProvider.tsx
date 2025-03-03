import React from "react";
import { AvatarContext } from "./AvatarContext";

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
