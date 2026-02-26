import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "../validators/serviceSchema";
import { FormDataService } from "../interface/FormDataService";
import TableService from "../components/TableService";
import { useCallback, useEffect, useState } from "react";
import SectionHeader from "../../../shared/components/SectionHeader";
import ServiceForm from "@/features/services/components/Form";
import ModalDelete from "../../../shared/components/Modal";
import RegisterButton from "../../../shared/components/RegisterButton";
import EmptyState from "../../../shared/components/EmptyState";
import Pagination from "../../../shared/components/Pagination";
import { usePagination } from "../../../shared/hooks/usePagination";
import { useShowForm } from "../../../shared/hooks/useShowForm";
import { useEditMode } from "../../../shared/hooks/useEditMode";
import { useLoading } from "@/shared/hooks/useLoading";
import { handleAuthError } from "@/utils/handleAuthError";
import { useNavigate } from "react-router-dom";
import { createService, deleteService, getServices, getServicesById, updateService } from "../services/api";
import { useHandleError } from "@/shared/hooks/useHandleError";
import { useCustomToast } from "@/shared/hooks/useCustomToast";

export default function ServicePage() {
	const { reset } = useForm<FormDataService>({
		resolver: yupResolver(serviceSchema),
	});
	const { currentPage, handlePrev, handleNext } = usePagination();
	const { showForm, openForm, closeForm } = useShowForm();
	const { isEditing, startEditing, stopEditing } = useEditMode();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedService, setSelectedService] =
		useState<FormDataService | null>();
	const [totalPages, setTotalPages] = useState(0);
	const [services, setServices] = useState<FormDataService[]>([]);
	const navigate = useNavigate();
	const { loading, startLoading, stopLoading } = useLoading();
	const handleError = useHandleError();
	const { showToast } = useCustomToast();

	const fetchService = useCallback(async () => {
		startLoading();

		try {
			const { data } = await getServices(currentPage);
			setServices(data.services);
			setTotalPages(data.totalPages);
		} catch (error) {
			handleAuthError(error, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [startLoading, currentPage, navigate, stopLoading]);

	const handleSubmitService = useCallback(
			async (data: FormDataService) => {
				try {
					if (!selectedService) {
						const createdService = await createService(data);
						if (createdService.status === 200) {
							showToast({
								title: "Serviço registrado com sucesso.",
								status: "success",
							});

							fetchService();
							closeForm();
						}
					} else {
						await updateService(Number(selectedService?.id), data);
						showToast({
							title: "Serviço alterado com sucesso.",
							status: "info",
						});
						fetchService();
						closeForm();
					}
				} catch (error) {
					console.error("Erro ao salvar dados", error);
					handleError(error);
				}
			},
			[closeForm, fetchService, handleError, selectedService, showToast]
		);

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

	const handleDeleteService = useCallback(async () => {
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
					closeForm();
					setSelectedService(null);
					fetchService();
				}
			} catch (error) {
				console.error("Erro ao excluir serviço", error);
				onClose();
				handleError(error);
			}
		}, [
			closeForm,
			fetchService,
			handleError,
			onClose,
			selectedService,
			setSelectedService,
			showToast,
		]);


	const handleCancel = () => {
		reset({
			serviceName: "",
			duration: "",
			price: 0,
		});
		closeForm();
		stopEditing();
	};


	useEffect(() => {
		if (!showForm) {
			fetchService();
		}
	}, [fetchService, showForm]);

	const handleNewClick = useCallback(() => {
		setSelectedService(null);
		openForm();
	}, [openForm]);

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
						description="Tem certeza que deseja excluir o serviço "
						onDelete={handleDeleteService}
					/>
				)}
			</Flex>
		</Container>
	);
}
