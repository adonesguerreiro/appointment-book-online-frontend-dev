import { useState } from "react";

export const usePagination = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
	const handleNext = () => setCurrentPage((prev) => prev + 1);

	return { currentPage, handlePrev, handleNext };
};
