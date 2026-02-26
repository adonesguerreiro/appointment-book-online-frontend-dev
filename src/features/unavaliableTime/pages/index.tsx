import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { unavailableTimeSchema } from "../validators/unavailableTimeSchema";
import { useCallback, useEffect, useState } from "react";
import TableUnavaliable from "../components/TableUnavaliable";
import UnavailableTimeForm from "../components/Form";
import SectionHeader from "../../../shared/components/SectionHeader";
import { FormDataUnavailableTime } from "../interface/FormDataUnavailableTime";
import ModalDelete from "../../../shared/components/Modal";
import EmptyState from "../../../shared/components/EmptyState";
import RegisterButton from "../../../shared/components/RegisterButton";
import Pagination from "../../../shared/components/Pagination";
import { usePagination } from "../../../shared/hooks/usePagination";
import { useShowForm } from "../../../shared/hooks/useShowForm";
import { useEditMode } from "../../../shared/hooks/useEditMode";
import { createUnavailableTime, deleteUnavailableTime, getUnavailableTimeById, getUnavailableTimes, updateUnavailableTime } from "../services/api";
import { useHandleError } from "@/shared/hooks/useHandleError";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useNavigate } from "react-router-dom";
import { useLoading } from "@/shared/hooks/useLoading";
import { handleAuthError } from "@/utils/handleAuthError";

export default function UnavaliableTimePage() {
	const { showForm, openForm, closeForm } = useShowForm();
	const { isEditing, startEditing, stopEditing } = useEditMode();
	const [selectedUnavailableTime, setSelectedUnavailableTime] =
		useState<FormDataUnavailableTime | null>(null);
	const { reset } = useForm<FormDataUnavailableTime>({
		resolver: yupResolver(unavailableTimeSchema),
	});
	const { currentPage, handlePrev, handleNext } = usePagination();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleError = useHandleError();
	const { showToast } = useCustomToast();

	const [unavaliables, setUnavaliables] = useState<FormDataUnavailableTime[]>(
		[]
	);
	const [totalPages, setTotalPages] = useState(0);
	const navigate = useNavigate();
	const { loading, startLoading, stopLoading } = useLoading();
	const fetchUnavaliableTime = useCallback(async () => {
		startLoading();

		try {
			const { data } = await getUnavailableTimes(currentPage);
			setUnavaliables(data.unavaliableTimes);
			setTotalPages(data.totalPages);
		} catch (error) {
			handleAuthError(error, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [startLoading, currentPage, navigate, stopLoading]);

	const handleSubmitUnavailableTime = useCallback(
		async (data: FormDataUnavailableTime) => {
			try {
				if (!selectedUnavailableTime) {
					const createdUnavailableTime = await createUnavailableTime(data);
					if (createdUnavailableTime.status === 200) {
						showToast({
							title: "Horário indisponível registrado com sucesso.",
							status: "success",
						});
						fetchUnavaliableTime();
						closeForm();
					}
				} else {
					await updateUnavailableTime(
						Number(selectedUnavailableTime?.id),
						data
					);
					showToast({
						title: "Horário indisponível alterado com sucesso.",
						status: "info",
					});
					fetchUnavaliableTime();
					closeForm();
				}
			} catch (error) {
				console.error("Erro ao salvar dados", error);
				handleError(error);
			}
		},
		[closeForm, fetchUnavaliableTime, handleError, selectedUnavailableTime, showToast]
	);

const handleEditUnavailableTime = useCallback(
		async (unavailableTimeId: number) => {
			try {
				startEditing();
				const unavailableTimeData = await getUnavailableTimeById(
					unavailableTimeId
				);
				setSelectedUnavailableTime(unavailableTimeData.data);
				openForm();
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		},
		[openForm, setSelectedUnavailableTime, startEditing]
	);

const handleUnavaliableTimeOpenModalDelete = useCallback(
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
		[onOpen, setSelectedUnavailableTime]
	);

	const handleDeleteUnavailableTime = useCallback(async () => {
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
					closeForm();
					setSelectedUnavailableTime(null);
					fetchUnavaliableTime();
				}
			} catch (error) {
				console.error("Erro ao excluir horário disponível", error);
			}
		}, [
			closeForm,
			fetchUnavaliableTime,
			onClose,
			selectedUnavailableTime,
			setSelectedUnavailableTime,
			showToast,
		]);

	const handleCancel = () => {
		reset({
			date: "",
			startTime: "",
			endTime: "",
		});
		closeForm();
		stopEditing();
	};


	useEffect(() => {
		fetchUnavaliableTime();
	}, [fetchUnavaliableTime]);

	const handleNewClick = useCallback(() => {
		setSelectedUnavailableTime(null);
		openForm();
	}, [openForm]);

	const handleEditClick = useCallback(
		(unavailableTimeId: number) => {
			handleEditUnavailableTime(unavailableTimeId);
		},
		[handleEditUnavailableTime]
	);

	const handleDeleteClick = useCallback(
		(unavailableTimeId: number) => {
			handleUnavaliableTimeOpenModalDelete(unavailableTimeId);
		},
		[handleUnavaliableTimeOpenModalDelete]
	);

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
				) : unavaliables.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Nova indisponibilidade"
							onNewClick={handleNewClick}
						/>
						<TableUnavaliable
							unavaliables={unavaliables}
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
						itemName={new Date(selectedUnavailableTime.date).toLocaleDateString(
							"pt-BR"
						)}
						description="Deseja excluir o horário indisponível do dia "
						onDelete={handleDeleteUnavailableTime}
					/>
				)}
			</Flex>
		</Container>
	);
}
