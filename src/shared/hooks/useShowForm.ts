import { useCallback, useState } from "react";

export const useShowForm = () => {
	const [showForm, setShowForm] = useState(false);

	const openForm = useCallback(() => setShowForm(true), []);
	const closeForm = useCallback(() => setShowForm(false), []);
	const toggleForm = useCallback(() => setShowForm((prev) => !prev), []);

	return {
		showForm,
		setShowForm,
		openForm,
		closeForm,
		toggleForm,
	};
};
