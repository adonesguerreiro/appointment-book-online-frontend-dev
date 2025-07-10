import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useEffect } from "react";
import { getCustomers, getCustomerById } from "../../services/api";
import { FormDataSchedule } from "../../interface/FormDataSchedule";

export const useScheduleCustomerEdit = (selectedSchedule: FormDataSchedule) => {
	const getAllCustomers = async ({ pageParam }: { pageParam: number }) => {
		const { data } = await getCustomers(pageParam);
		return data.customers;
	};

	const {
		data: customersData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["customers", "list"],
		queryFn: getAllCustomers,
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length === 10 ? allPages.length + 1 : undefined;
		},
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10,
	});

	const { data: selectedCustomer } = useQuery({
		queryKey: ["customer", selectedSchedule?.customerId],
		queryFn: () => getCustomerById(Number(selectedSchedule?.customerId)),
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10,
		enabled: !!selectedSchedule?.customerId,
	});
	const allCustomers = useMemo(() => {
		const infiniteCustomers =
			customersData?.pages?.flatMap((page) => page) || [];

		if (
			selectedCustomer &&
			!infiniteCustomers.some((c) => c.id === selectedCustomer.data.id)
		) {
			return [selectedCustomer.data, ...infiniteCustomers];
		}

		return infiniteCustomers;
	}, [selectedCustomer, customersData?.pages]);

	useEffect(() => {
		const customerId = selectedSchedule?.customerId;

		if (!customerId) return;

		const infiniteCustomers =
			customersData?.pages.flatMap((page) => page) || [];
		const alreadyIncluded = infiniteCustomers.some((c) => c.id === customerId);

		if (!alreadyIncluded && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [
		customersData?.pages,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		selectedSchedule?.customerId,
	]);

	return {
		allCustomers,
	};
};
