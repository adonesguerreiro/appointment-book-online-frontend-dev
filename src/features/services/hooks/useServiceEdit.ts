import { useCallback } from "react";
import { getServicesById } from "../services/api";
import { useEditMode } from "@/shared/hooks/useEditMode";

export const useServiceEdit = () => {
	const { startEditing } = useEditMode();

	const handleEditService = useCallback(
		async (serviceId: number) => {
			try {
				startEditing();
				const serviceData = await getServicesById(serviceId);
				return serviceData.data;
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		},
		[startEditing],
	);

	return {
		handleEditService,
	};
};
