import { useCallback } from "react";
import { FormDataService } from "../../interface/FormDataService";
import { getServicesById } from "../../services/api";

interface useServiceEditProps {
	setIsEditing: (editing: boolean) => void;
	setSelectedService: (unavailableTime: FormDataService) => void;
	openForm: () => void;
}

export const useServiceEdit = ({
	setIsEditing,
	setSelectedService,
	openForm,
}: useServiceEditProps) => {
	const handleEditService = useCallback(
		async (serviceId: number) => {
			try {
				setIsEditing(true);
				const serviceData = await getServicesById(serviceId);
				setSelectedService(serviceData.data);
				openForm();
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		},
		[openForm, setIsEditing, setSelectedService]
	);

	return {
		handleEditService,
	};
};
