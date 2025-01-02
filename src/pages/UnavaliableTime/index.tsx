import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { unavailableTimeSchema } from "./unavailableTimeSchema";
import { useCallback, useEffect, useState } from "react";
import TableUnavaliable from "./TableUnavaliable";
import UnavailableTimeForm from "../../components/Form/UnavailableTime";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useHandleError } from "../../hooks/useHandleError";
import SectionHeader from "../../components/SectionHeader";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../interface/CustomJwtPayload";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";
import {
	getUnavailableTimeById,
	getUnavailableTimes,
	createUnavailableTime,
	updateUnavailableTime,
	deleteUnavailableTime,
} from "../../services/api";
import { handleAuthError } from "../../utils/handleAuthError";
import ModalDelete from "../../components/Modal";
import EmptyState from "../../components/EmptyState";
import RegisterButton from "../../components/RegisterButton";
import Pagination from "../../components/Pagination";
import { useCustomToast } from "../../hooks/useCustomToast";

export default function UnavaliableTimePage() {
	const { reset } = useForm<FormDataUnavailableTime>({
		resolver: yupResolver(unavailableTimeSchema),
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [unavailables, setUnavailables] = useState<FormDataUnavailableTime[]>(
		[]
	);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [selectedUnavailableTime, setSelectedUnavailableTime] =
		useState<FormDataUnavailableTime | null>();
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { showToast } = useCustomToast();
	const handleError = useHandleError();

	const { token, logout } = useAuth();

	const handleSubmitUnavailableTime = async (data: FormDataUnavailableTime) => {
		try {
			if (token && !selectedUnavailableTime) {
				const createdUnavailableTime = await createUnavailableTime(data);
				if (createdUnavailableTime.status === 200) {
					showToast({
						title: "Horário indisponível registrado com sucesso.",
						status: "success",
					});
					fetchData();
					setShowForm(false);
				}
			} else {
				await updateUnavailableTime(Number(selectedUnavailableTime?.id), data);
				showToast({
					title: "Horário indisponível alterado com sucesso.",
					status: "info",
				});
				fetchData();
				setShowForm(false);
			}
		} catch (error) {
			console.error("Erro ao salvar dados", error);
			handleError(error);
		}
	};

	const handleEditUnavailableTime = async (unavailableTimeId: number) => {
		try {
			setIsEditing(true);
			const unavailableTimeData = await getUnavailableTimeById(
				unavailableTimeId
			);

			setSelectedUnavailableTime(unavailableTimeData.data);
			setShowForm(true);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	const handleDeleteUnavaliableTime = useCallback(
		async (unavailableTimeId: number) => {
			try {
				const unavailableTimeData = await getUnavailableTimeById(
					unavailableTimeId
				);

				setSelectedUnavailableTime(unavailableTimeData.data);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do horário disponível", error);
			}
		},
		[onOpen]
	);

	const onDeleteUnavailableTime = async () => {
		if (!selectedUnavailableTime || !selectedUnavailableTime.id) {
			console.error("Horário indisponível selecionado não encontrado.");
			return;
		}

		try {
			const deletedUnavailableTime = await deleteUnavailableTime(
				selectedUnavailableTime.id
			);
			if (deletedUnavailableTime.status === 200) {
				onClose();
				showToast({
					title: "Horário indisponível excluído com sucesso.",
					status: "success",
				});
				setShowForm(false);
				setSelectedUnavailableTime(null);
				fetchData();
			}
		} catch (error) {
			console.error("Erro ao excluir horário disponível", error);
		}
	};

	const handleCancel = () => {
		reset({
			date: "",
			startTime: "",
			endTime: "",
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
			const unavailableTimeData = await getUnavailableTimes(
				companyId,
				currentPage
			);
			setUnavailables(unavailableTimeData.data.unavailableTimes);
			setTotalPages(unavailableTimeData.data.totalPages);
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
		setSelectedUnavailableTime(null);
		setShowForm(true);
	}, []);

	const handleEditClick = useCallback((unavailableTimeId: number) => {
		handleEditUnavailableTime(unavailableTimeId);
	}, []);

	const handleDeleteClick = useCallback(
		(unavailableTimeId: number) => {
			handleDeleteUnavaliableTime(unavailableTimeId);
		},
		[handleDeleteUnavaliableTime]
	);

	const handleNext = () => setCurrentPage((prev) => prev + 1);
	const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
				<SectionHeader title="Horários indisponíveis" />

				{showForm ? (
					<UnavailableTimeForm
						onSubmit={handleSubmitUnavailableTime}
						onEdit={() =>
							handleEditUnavailableTime(Number(selectedUnavailableTime))
						}
						onCancel={handleCancel}
						isEditing={isEditing}
						selectedUnavailableTime={selectedUnavailableTime}
					/>
				) : unavailables.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Nova indisponibilidade"
							onNewClick={handleNewClick}
						/>
						<TableUnavaliable
							unavailables={unavailables}
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
							buttonText="Nova indisponibilidade"
							onNewClick={handleNewClick}
						/>
						<EmptyState />
					</>
				)}
				{selectedUnavailableTime && (
					<ModalDelete
						isOpen={isOpen}
						onClose={onClose}
						title="horário disponível"
						itemName={new Date(
							selectedUnavailableTime.date!
						).toLocaleDateString("pt-BR")}
						onDelete={onDeleteUnavailableTime}
					/>
				)}
			</Flex>
		</Container>
	);
}
