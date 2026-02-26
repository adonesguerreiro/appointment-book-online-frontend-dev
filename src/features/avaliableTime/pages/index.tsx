import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { availableTimeSchema } from "../validators/availableTimeSchema";
import { FormDataAvailableTime } from "../interface/FormDataAvailableTime";
import { useCallback, useEffect, useState } from "react";
import TableAvaliable from "../components/TableAvaliable";
import SectionHeader from "../../../shared/components/SectionHeader";
import AvailableTime from "../components/AvailableTime";
import RegisterButton from "../../../shared/components/RegisterButton";
import EmptyState from "../../../shared/components/EmptyState";
import Pagination from "../../../shared/components/Pagination";
import { usePagination } from "../../../shared/hooks/usePagination";
import ModalDelete from "../../../shared/components/Modal";
import { dayMapping } from "../../../utils/dayMapping";
import { useShowForm } from "../../../shared/hooks/useShowForm";
import { useEditMode } from "../../../shared/hooks/useEditMode";
import { createAvaliableTime, deleteAvaliableTime, getAvaliableTimeById, getAvaliableTimes, updateAvaliableTime } from "../services/api";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useHandleError } from "@/shared/hooks/useHandleError";
import { useLoading } from "@/shared/hooks/useLoading";
import { useNavigate } from "react-router-dom";
import { handleAuthError } from "@/utils/handleAuthError";

export default function AvaliableTimePage() {
	const { reset } = useForm<FormDataAvailableTime>({
		resolver: yupResolver(availableTimeSchema),
	});

	const { currentPage, handlePrev, handleNext } = usePagination();
	const { showForm, openForm, closeForm } = useShowForm();
	const { isEditing, startEditing, stopEditing } = useEditMode();
	const [selectedAvaliableTime, setSelectAvaliableTime] =
		useState<FormDataAvailableTime | null>();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { showToast } = useCustomToast();
	const  handleError = useHandleError();
	const [availableTime, setAvailableTime] = useState<FormDataAvailableTime[]>(
		[]
	);
	const [totalPages, setTotalPages] = useState(0);
	const navigate = useNavigate();
	const { loading, startLoading, stopLoading } = useLoading();

	const fetchAvaliableTime = useCallback(async () => {
			startLoading();
			try {
				const avaliableTimeData = await getAvaliableTimes(currentPage);
				setAvailableTime(avaliableTimeData.data.avaliableTimes);
				setTotalPages(avaliableTimeData.data.totalPages);
			} catch (error) {
				handleAuthError(error, navigate);
				console.error("Erro ao buscar dados", error);
			} finally {
				stopLoading();
			}
		}, [startLoading, currentPage, navigate, stopLoading]);

			const handleSubmitAvaliableTime = useCallback( async (data: FormDataAvailableTime) => {
				try {
					if (!selectedAvaliableTime) {
						const createdService = await createAvaliableTime(data);
						if (createdService.status === 200) {
							showToast({
								title: "Horário disponível registrado com sucesso.",
								status: "success",
							});
							fetchAvaliableTime();
							closeForm();
						}
					} else {
						await updateAvaliableTime(Number(selectedAvaliableTime?.id), data);
						showToast({
							title: "Horário disponível alterado com sucesso.",
							status: "info",
						});
						fetchAvaliableTime();
						closeForm();
					}
				} catch (error) {
					console.error("Erro ao salvar dados", error);
					handleError(error);
				}
			}, [closeForm, fetchAvaliableTime, handleError, selectedAvaliableTime, showToast]);

		const handleEditAvaliableTime = useCallback(async (avaliableTimeId: number) => {
			try {
				startEditing();
				const avaliableTimeData = await getAvaliableTimeById(avaliableTimeId);
				setSelectAvaliableTime(avaliableTimeData.data);
				openForm();
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		}, [openForm, startEditing]);

	const handleAvaliableTimeOpenDeleteModal = useCallback(
		async (avaliableTimeId: number) => {
			try {
				const avaliableTime = await getAvaliableTimeById(avaliableTimeId);
				setSelectAvaliableTime(avaliableTime.data);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do horário disponível", error);
			}
		},
		[onOpen, setSelectAvaliableTime]
	);

	const handleDeleteAvaliableTime = useCallback(async () => {
			if (!selectedAvaliableTime || !selectedAvaliableTime.id) {
				console.error("Horário indisponível selecionado não encontrado.");
				return;
			}

			try {
				const deletedUnavailableTime = await deleteAvaliableTime(
					selectedAvaliableTime.id
				);
				if (deletedUnavailableTime.status === 200) {
					onClose();
					showToast({
						title: "Horário disponível excluído com sucesso.",
						status: "success",
					});
					closeForm();
					setSelectAvaliableTime(null);
					fetchAvaliableTime();
				}
			} catch (error) {
				console.error("Erro ao excluir horário disponível", error);
				onClose();
				handleError(error);
			}
		}, [
			closeForm,
			fetchAvaliableTime,
			handleError,
			onClose,
			selectedAvaliableTime,
			setSelectAvaliableTime,
			showToast,
		]);

	const handleCancel = () => {
		reset({
			day: "",
			startTime: "",
			endTime: "",
			interval: 0,
		});
		closeForm();
		stopEditing();
	};

	useEffect(() => {
		if (!showForm) {
			fetchAvaliableTime();
		}
	}, [fetchAvaliableTime, showForm]);

	const handleNewClick = useCallback(() => {
		setSelectAvaliableTime(null);
		openForm();
	}, [openForm]);

	const handleEditClick = useCallback(
		(avaliableTimeId: number) => {
			handleEditAvaliableTime(avaliableTimeId);
		},
		[handleEditAvaliableTime]
	);

	const handleDeleteClick = useCallback(
		(avaliableTimeId: number) => {
			handleAvaliableTimeOpenDeleteModal(avaliableTimeId);
		},
		[handleAvaliableTimeOpenDeleteModal]
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
				<SectionHeader title="Horário disponíveis" />

				{showForm ? (
					<AvailableTime
						onSubmit={handleSubmitAvaliableTime}
						onEdit={() =>
							handleEditAvaliableTime(Number(selectedAvaliableTime))
						}
						onCancel={handleCancel}
						isEditing={isEditing}
						selectedAvaliableTime={selectedAvaliableTime}
					/>
				) : availableTime.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Novo horário"
							onNewClick={handleNewClick}
						/>
						<TableAvaliable
							availables={availableTime}
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
							buttonText="Novo horário"
							onNewClick={handleNewClick}
						/>
						<EmptyState />
					</>
				)}
				{selectedAvaliableTime && (
					<ModalDelete
						isOpen={isOpen}
						onClose={onClose}
						title="horário disponível"
						itemName={dayMapping[selectedAvaliableTime?.day]}
						description="Deseja excluir o horário indisponível na "
						onDelete={handleDeleteAvaliableTime}
					/>
				)}
			</Flex>
		</Container>
	);
}
