import {
	Container,
	Flex,
	Heading,
	Spinner,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import TableSchedule from "./TableSchedule";
import { scheduleSchema } from "./scheduleSchema";
import { FormDataSchedule } from "../../interface/FormDataSchedule";
import ScheduleForm from "../../components/Form/Schedule";
import { useHandleError } from "../../hooks/useHandleError";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CustomJwtPayload } from "../../interface/CustomJwtPayload";
import {
	createSchedule,
	getScheduleById,
	getSchedules,
	updateSchedule,
} from "../../services/api";
import { handleAuthError } from "../../utils/handleAuthError";
import ModalDelete from "../../components/Modal";

export default function SchedulePage() {
	const { reset } = useForm<FormDataSchedule>({
		resolver: yupResolver(scheduleSchema),
		defaultValues: { customerId: 0, serviceId: 0, status: "", date: "" },
	});

	const [schedules, setSchedules] = useState<FormDataSchedule[]>([]);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [selectedSchedule, setSelectedSchedule] =
		useState<FormDataSchedule | null>();
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate();

	const { isOpen, onClose } = useDisclosure();

	const toast = useToast();
	const handleError = useHandleError();

	const { token, logout } = useAuth();

	const handleSubmitSchedule = async (data: FormDataSchedule) => {
		try {
			if (token && !selectedSchedule) {
				const createdSchedule = await createSchedule(data);
				if (createdSchedule.status === 200) {
					toast({
						title: "Agendamento registrado com sucesso.",
						status: "success",
						duration: 3000,
						isClosable: true,
						position: "top-right",
					});
					fetchData();
					setShowForm(false);
				}
			} else {
				await updateSchedule(Number(selectedSchedule?.id), data);
				toast({
					title: "Agendamento alterado com sucesso.",
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

	const handleEditSchedule = async (scheduleId: number) => {
		try {
			setIsEditing(true);
			const scheduleData = await getScheduleById(scheduleId);

			setSelectedSchedule(scheduleData.data);
			setShowForm(true);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	const handleCancel = () => {
		reset({
			customerId: 0,
			serviceId: 0,
			status: "",
			date: "",
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
			const scheduleData = await getSchedules(companyId);
			setSchedules(scheduleData.data);
		} catch (error) {
			handleAuthError(error, logout, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			setLoading(false);
		}
	}, [token, logout, navigate]);

	useEffect(() => {
		fetchData();
	}, [fetchData, token]);

	const handleNewClick = useCallback(() => {
		setSelectedSchedule(null);
		setShowForm(true);
	}, []);

	const handleEditClick = useCallback((scheduleId: number) => {
		handleEditSchedule(scheduleId);
	}, []);

	return loading ? (
		<Spinner />
	) : (
		<Container>
			<Flex
				display="flex"
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<Heading
					as="h1"
					size="lg"
					fontWeight="semibold">
					Agenda
				</Heading>
				{showForm ? (
					<ScheduleForm
						onSubmit={handleSubmitSchedule}
						onEdit={() => handleEditSchedule(Number(selectedSchedule))}
						onCancel={handleCancel}
						isEditing={isEditing}
						selectedSchedule={selectedSchedule}
					/>
				) : (
					<TableSchedule
						schedules={schedules}
						onNewClick={handleNewClick}
						onEditClick={handleEditClick}
					/>
				)}
				{selectedSchedule && (
					<ModalDelete
						isOpen={isOpen}
						onClose={onClose}
						title="agendamento"
						itemName={selectedSchedule.date}
					/>
				)}
			</Flex>
		</Container>
	);
}
