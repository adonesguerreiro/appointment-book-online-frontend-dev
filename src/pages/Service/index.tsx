import { Container, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "./serviceSchema";
import {
	FormDataService,
	FormDataServiceEdit,
} from "../../interface/FormDataService";
import TableService from "./TableService";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
	createService,
	deleteService,
	getServices,
	getServicesById,
	updateService,
} from "../../services/api";
import { AxiosError } from "axios";
import SectionHeader from "../../components/SectionHeader";
import ServiceForm from "../../components/Form/Service";
import ModalComponent from "../../components/Modal";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../interface/CustomJwtPayload";

export default function ServicePage() {
	const { reset } = useForm<FormDataService>({
		resolver: yupResolver(serviceSchema),
		defaultValues: { name: "", duration: "", price: 0 },
	});

	const [services, setServices] = useState<FormDataServiceEdit[]>([]);
	const [showForm, setShowForm] = useState(false);
	const [selectedService, setSelectedService] =
		useState<FormDataService | null>();
	const [isEditing, setIsEditing] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const toast = useToast();
	const navigate = useNavigate();
	const { token } = useAuth();

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
					setShowForm(false);
					navigate("/service");
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
				setShowForm(false);
				navigate("/service");
			}
		} catch (error) {
			console.error("Erro ao salvar dados", error);
			if (error instanceof AxiosError) {
				const errors = error.response?.data.errors[0];

				toast({
					title: errors.message,
					status: "warning",
					duration: 3000,
					isClosable: true,
					position: "top-right",
				});
			}
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

	const handleDeleteService = async (serviceId: number) => {
		const serviceData = await getServicesById(serviceId);

		setSelectedService(serviceData.data);
		onOpen();
	};

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
				navigate("/service");
			}
		} catch (error) {
			console.error("Erro ao excluir serviço", error);
		}
	};

	const handleCancel = () => {
		reset({
			name: "",
			duration: "",
			price: 0,
		});
		setShowForm(false);
		setIsEditing(false);
	};

	const fetchData = async () => {
		if (!token) {
			return;
		}

		try {
			const decoded = jwtDecode<CustomJwtPayload>(token);
			const companyId = decoded.id;
			const serviceData = await getServices(companyId);
			setServices(serviceData.data);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	useEffect(() => {
		fetchData();
	});

	return (
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
				) : (
					<TableService
						services={services}
						onNewClick={() => {
							setSelectedService(null);
							setShowForm(true);
						}}
						onEditClick={(serviceId: number) => {
							handleEditService(serviceId);
						}}
						onDeleteClick={(serviceId: number) => {
							handleDeleteService(serviceId);
						}}
					/>
				)}

				{selectedService && (
					<ModalComponent
						isOpen={isOpen}
						onClose={onClose}
						title="serviço"
						itemName={selectedService.name}
						onDelete={onDeleteService}
					/>
				)}
			</Flex>
		</Container>
	);
}
