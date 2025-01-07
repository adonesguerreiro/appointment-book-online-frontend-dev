import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "./serviceSchema";
import { FormDataService } from "../../interface/FormDataService";
import TableService from "./TableService";
import { useCallback, useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import ServiceForm from "../../components/Form/Service";
import ModalDelete from "../../components/Modal";
import RegisterButton from "../../components/RegisterButton";
import EmptyState from "../../components/EmptyState";
import Pagination from "../../components/Pagination";
import { useService } from "../../hooks/Service/useService";
import { useServiceSubmit } from "../../hooks/Service/useServiceSubmit";
import { useServiceEdit } from "../../hooks/Service/useServiceEdit";
import { useServiceOpenDeleteModal } from "../../hooks/Service/useServiceOpenDeleteModal";
import { usePagination } from "../../hooks/usePagination";
import { useServiceDelete } from "../../hooks/Service/useServiceDelete";
import { useServiceCancel } from "../../hooks/Service/useServiceCancel";

export default function ServicePage() {
	const { reset } = useForm<FormDataService>({
		resolver: yupResolver(serviceSchema),
	});
	const { currentPage, handlePrev, handleNext } = usePagination();

	const [showForm, setShowForm] = useState(false);
	const [selectedService, setSelectedService] =
		useState<FormDataService | null>();
	const [isEditing, setIsEditing] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { fetchService, services, totalPages, loading } =
		useService(currentPage);
	const { handleSubmitService } = useServiceSubmit({
		fetchService,
		setShowForm,
		selectedService,
	});

	const { handleEditService } = useServiceEdit({
		setIsEditing,
		setSelectedService,
		setShowForm,
	});

	const { handleServiceOpenModalDelete } = useServiceOpenDeleteModal({
		onOpen,
		setSelectedService,
	});

	const { handleDeleteService } = useServiceDelete({
		onClose,
		setShowForm,
		fetchService,
		selectedService,
		setSelectedService,
	});

	const { handleCancel } = useServiceCancel({
		reset,
		setShowForm,
		setIsEditing,
	});

	useEffect(() => {
		fetchService();
	}, [fetchService]);

	const handleNewClick = useCallback(() => {
		setSelectedService(null);
		setShowForm(true);
	}, []);

	const handleEditClick = useCallback(
		(serviceId: number) => {
			handleEditService(serviceId);
		},
		[handleEditService]
	);

	const handleDeleteClick = useCallback(
		(serviceId: number) => {
			handleServiceOpenModalDelete(serviceId);
		},
		[handleServiceOpenModalDelete]
	);

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
						onDelete={handleDeleteService}
					/>
				)}
			</Flex>
		</Container>
	);
}
