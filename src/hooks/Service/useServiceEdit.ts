import { useCallback } from "react";
import { FormDataService } from "../../interface/FormDataService";
import { getServicesById } from "../../services/api";

interface useServiceEditProps {
	setIsEditing: (editing: boolean) => void;
	setShowForm: (show: boolean) => void;
	setSelectedService: (unavailableTime: FormDataService) => void;
}

export const useServiceEdit = ({
	setIsEditing,
	setShowForm,
	setSelectedService,
}: useServiceEditProps) => {
	const handleEditService = useCallback(
		async (serviceId: number) => {
			try {
				setIsEditing(true);
				const serviceData = await getServicesById(serviceId);

				setSelectedService(serviceData.data);
				setShowForm(true);
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		},
		[setIsEditing, setSelectedService, setShowForm]
	);

	return {
		handleEditService,
	};
};
