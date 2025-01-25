import { useCallback } from "react";
import { FormDataService } from "../../interface/FormDataService";
import { getServicesById } from "../../services/api";

interface useServiceEditProps {
	setSelectedService: (unavailableTime: FormDataService) => void;
	openForm: () => void;
	startEditing: () => void;
}

export const useServiceEdit = ({
	setSelectedService,
	openForm,
	startEditing,
}: useServiceEditProps) => {
	const handleEditService = useCallback(
		async (serviceId: number) => {
			try {
				startEditing();
				const serviceData = await getServicesById(serviceId);
				setSelectedService(serviceData.data);
				openForm();
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		},
		[openForm, setSelectedService, startEditing]
	);

	return {
		handleEditService,
	};
};
