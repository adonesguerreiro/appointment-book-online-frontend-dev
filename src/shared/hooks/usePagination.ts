import { useSearchParams } from "react-router-dom";

export const usePagination = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const pageParam = Number(searchParams.get("page"));
	const currentPage = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1;

	const setPage = (page: number) => {
		if (page === currentPage) return;

		const params = new URLSearchParams(searchParams);
		params.set("page", String(page));
		setSearchParams(params);
	};

	return {
		currentPage,
		setPage,
	};
};
