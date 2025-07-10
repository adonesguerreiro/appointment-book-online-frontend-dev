import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo, useEffect } from "react";
import { getServices, getServicesById } from "../../services/api";
import { FormDataSchedule } from "../../interface/FormDataSchedule";

export const useScheduleServiceEdit = (selectedSchedule: FormDataSchedule) => {
	const getAllServices = async ({ pageParam }: { pageParam: number }) => {
		const { data } = await getServices(pageParam);

		return data.services;
	};

	const {
		data: servicesData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["services", "all"],
		queryFn: getAllServices,
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10,
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.length === 10 ? pages.length + 1 : undefined;
		},
	});

	const { data: selectedService } = useQuery({
		queryKey: ["service", selectedSchedule?.serviceId],
		queryFn: () => getServicesById(Number(selectedSchedule?.serviceId)),
		enabled: !!selectedSchedule?.serviceId,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});

	const allServices = useMemo(() => {
		const infiniteServices = servicesData?.pages.flatMap((page) => page) || [];

		if (
			selectedService &&
			!infiniteServices.some((s) => s.id === selectedService.data.id)
		) {
			return [selectedService.data, ...infiniteServices];
		}

		return infiniteServices;
	}, [selectedService, servicesData?.pages]);

	useEffect(() => {
		const serviceId = selectedSchedule?.serviceId;
		if (!serviceId) return;

		const infiniteServices = servicesData?.pages.flatMap((page) => page) || [];
		const alreadyIncluded = infiniteServices.some((s) => s.id === serviceId);

		if (!alreadyIncluded && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [
		servicesData?.pages,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		selectedSchedule.serviceId,
	]);

	return {
		allServices,
	};
};
