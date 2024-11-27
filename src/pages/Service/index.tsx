import {
	Container,
	Flex,
	Spinner,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "./serviceSchema";
import { FormDataService } from "../../interface/FormDataService";
import TableService from "./TableService";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import {
	createService,
	deleteService,
	getServices,
	getServicesById,
	updateService,
} from "../../services/api";

import SectionHeader from "../../components/SectionHeader";
import ServiceForm from "../../components/Form/Service";
import ModalDelete from "../../components/Modal";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../interface/CustomJwtPayload";
import { useHandleError } from "../../hooks/useHandleError";
import { useNavigate } from "react-router-dom";
import { handleAuthError } from "../../utils/handleAuthError";
import RegisterButton from "../../components/RegisterButton";
import EmptyState from "../../components/EmptyState";
import Pagination from "../../components/Pagination";

export default function ServicePage() {
	const { reset } = useForm<FormDataService>({
		resolver: yupResolver(serviceSchema),
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [services, setServices] = useState<FormDataService[]>([]);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [selectedService, setSelectedService] =
		useState<FormDataService | null>();
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const toast = useToast();
	const handleError = useHandleError();

	const { token, logout } = useAuth();

	const handleSubmitService = async (data: FormDataService) => {
		try {
			if (token && !selectedService) {
				const createdService = await createService(data);
				if (createdService.status === 200) {
					toast({
						title: "Serviço registrado com sucesso.",
						status: "success",
						duration: 3000,
						isClosable: true,
						position: "top-right",
					});
					fetchData();
					setShowForm(false);
				}
			} else {
				await updateService(Number(selectedService?.id), data);
				toast({
					title: "Serviço alterado com sucesso.",
					status: "info",
					duration: 3000,
					isClosable: true,
					position: "top-right",
				});
				fetchData();
				setShowForm(false);
			}
		} catch (error) {
			console.error("Erro ao salvar dados", error);
			handleError(error);
		}
	};

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
				toast({
					title: "Serviço excluído com sucesso.",
					status: "success",
					duration: 3000,
					isClosable: true,
					position: "top-right",
				});
				setShowForm(false);
				setSelectedService(null);
				fetchData();
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

	const fetchData = useCallback(async () => {
		if (!token) return;
		setLoading(true);

		try {
			const decoded = jwtDecode<CustomJwtPayload>(token);
			const companyId = decoded.id;
			const serviceData = await getServices(companyId, currentPage);
			setServices(serviceData.data.services);
			setTotalPages(serviceData.data.totalPages);
		} catch (error) {
			handleAuthError(error, logout, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			setLoading(false);
		}
	}, [token, currentPage, logout, navigate]);

	useEffect(() => {
		fetchData();
	}, [fetchData, token]);

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
