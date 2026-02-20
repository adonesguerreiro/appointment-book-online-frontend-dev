import { useState, useCallback } from "react";

export const useEditMode = () => {
	const [isEditing, setIsEditing] = useState(false);

	const startEditing = useCallback(() => setIsEditing(true), []);
	const stopEditing = useCallback(() => setIsEditing(false), []);
	const toggleEditMode = useCallback(() => setIsEditing((prev) => !prev), []);

	return {
		isEditing,
		setIsEditing,
		startEditing,
		stopEditing,
		toggleEditMode,
	};
};
