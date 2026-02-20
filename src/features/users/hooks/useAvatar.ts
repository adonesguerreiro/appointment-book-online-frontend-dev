import React from "react";
import { AvatarContext } from "../context/AvatarContext";

export function useAvatar() {
	const context = React.useContext(AvatarContext);
	if (!context) {
		throw new Error("useAvatar must be used within an AvatarProvider");
	}
	return context;
}
