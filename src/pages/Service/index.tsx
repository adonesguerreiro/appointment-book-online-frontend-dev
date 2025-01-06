import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "./serviceSchema";
import { FormDataService } from "../../interface/FormDataService";
import TableService from "./TableService";
import { useCallback, useEffect, useState } from "react";
import { deleteService, getServicesById } from "../../services/api";
import SectionHeader from "../../components/SectionHeader";
import ServiceForm from "../../components/Form/Service";
import ModalDelete from "../../components/Modal";
import RegisterButton from "../../components/RegisterButton";
import EmptyState from "../../components/EmptyState";
import Pagination from "../../components/Pagination";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useService } from "../../hooks/Service/useService";
import { useServiceSubmit } from "../../hooks/Service/useServiceSubmit";

export default function ServicePage() {
	const { reset } = useForm<FormDataService>({
		resolver: yupResolver(serviceSchema),
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [showForm, setShowForm] = useState(false);
	const [selectedService, setSelectedService] =
		useState<FormDataService | null>();
	const [isEditing, setIsEditing] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { showToast } = useCustomToast();

	const { fetchService, services, totalPages, loading } =
		useService(currentPage);
	const { handleSubmitService } = useServiceSubmit({
		fetchService,
		setShowForm,
		selectedService,
	});

	const handleEditService = async (serviceId: number) => {
		try {
			setIsEditing(true);
			const serviceData = await getServicesById(serviceId);

			setSelectedService(serviceData.data);
			setShowForm(true);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	const handleDeleteService = useCallback(
		async (serviceId: number) => {
			try {
				const serviceData = await getServicesById(serviceId);

				setSelectedService(serviceData.data);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do serviço", error);
			}
		},
		[onOpen]
	);

	const onDeleteService = async () => {
		if (!selectedService || !selectedService.id) {
			console.error("Serviço selecionado não encontrado.");
			return;
		}

		try {
			const deletedService = await deleteService(selectedService.id);
			if (deletedService.status === 200) {
				onClose();
				showToast({
					title: "Serviço excluído com sucesso.",
					status: "success",
				});
				setShowForm(false);
				setSelectedService(null);
				fetchService();
			}
		} catch (error) {
			console.error("Erro ao excluir serviço", error);
		}
	};

	const handleCancel = () => {
		reset({
			serviceName: "",
			duration: "",
			price: 0,
		});
		setShowForm(false);
		setIsEditing(false);
	};

	useEffect(() => {
		fetchService();
	}, [fetchService]);

	const handleNewClick = useCallback(() => {
		setSelectedService(null);
		setShowForm(true);
	}, []);

	const handleEditClick = useCallback((serviceId: number) => {
		handleEditService(serviceId);
	}, []);

	const handleDeleteClick = useCallback(
		(serviceId: number) => {
			handleDeleteService(serviceId);
		},
		[handleDeleteService]
	);

	const handleNext = () => setCurrentPage((prev) => prev + 1);
	const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

	return loading ? (
		<Spinner />
	) : (
		<Container>
			<Flex
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<SectionHeader title="Serviço" />

				{showForm ? (
					<ServiceForm
						onSubmit={handleSubmitService}
						onEdit={() => handleEditService(Number(selectedService))}
						onCancel={handleCancel}
						isEditing={isEditing}
						selectedService={selectedService}
					/>
				) : services.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Novo serviço"
							onNewClick={handleNewClick}
						/>

						<TableService
							services={services}
							onNewClick={handleNewClick}
							onEditClick={handleEditClick}
							onDeleteClick={handleDeleteClick}
						/>
						<Pagination
							handlePrev={handlePrev}
							handleNext={handleNext}
							currentPage={currentPage}
							totalPages={totalPages}
						/>
					</>
				) : (
					<>
						<RegisterButton
							buttonText="Novo serviço"
							onNewClick={handleNewClick}
						/>
						<EmptyState />
					</>
				)}

				{selectedService && (
					<ModalDelete
						isOpen={isOpen}
						onClose={onClose}
						title="serviço"
						itemName={selectedService.serviceName}
						onDelete={onDeleteService}
					/>
				)}
			</Flex>
		</Container>
	);
}
