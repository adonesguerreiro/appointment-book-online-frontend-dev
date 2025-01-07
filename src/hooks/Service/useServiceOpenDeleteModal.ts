import { useCallback } from "react";
import { FormDataService } from "../../interface/FormDataService";
import { getServicesById } from "../../services/api";

interface useServiceOpenModalDeleteProps {
	setSelectedService: (selectedService: FormDataService) => void;
	onOpen: () => void;
}

export const useServiceOpenDeleteModal = ({
	setSelectedService,
	onOpen,
}: useServiceOpenModalDeleteProps) => {
	const handleServiceOpenModalDelete = useCallback(
		async (serviceId: number) => {
			try {
				const serviceData = await getServicesById(serviceId);

				setSelectedService(serviceData.data);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do serviço", error);
			}
		},
		[onOpen, setSelectedService]
	);

	return { handleServiceOpenModalDelete };
};
