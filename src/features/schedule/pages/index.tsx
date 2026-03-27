import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import TableSchedule from "../components/TableSchedule";
import { scheduleSchema } from "../validators/scheduleSchema";
import { FormDataSchedule } from "../interface/FormDataSchedule";
import ScheduleForm from "../components/Form";
import ModalDelete from "../../../shared/components/Modal";
import RegisterButton from "../../../shared/components/RegisterButton";
import EmptyState from "../../../shared/components/EmptyState";
import Pagination from "../../../shared/components/Pagination";
import HeadingComponent from "../../../shared/components/Heading";
import { usePagination } from "../../../shared/hooks/usePagination";
import { useShowForm } from "../../../shared/hooks/useShowForm";
import { useEditMode } from "../../../shared/hooks/useEditMode";
import {
	createSchedule,
	getScheduleById,
	getSchedules,
	updateSchedule,
} from "../services/api";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useHandleError } from "@/shared/hooks/useHandleError";
import { useNavigate } from "react-router-dom";
import { useLoading } from "@/shared/hooks/useLoading";
import { handleAuthError } from "@/utils/handleAuthError";
import { getAvaliableTimesSlots } from "@/features/avaliableTime/services/api";

export default function SchedulePage() {
	const { reset } = useForm<FormDataSchedule>({
		resolver: yupResolver(scheduleSchema),
	});
	const { showForm, openForm, closeForm } = useShowForm();
	const { currentPage, handlePrev, handleNext } = usePagination();
	// const { timeSlots, setTimeSlots, fetchDataTimeSlot } = useTimeSlots();
	const { isEditing, startEditing, stopEditing } = useEditMode();
	const { isOpen, onClose } = useDisclosure();
	const [selectedDate, setSelectedDate] = useState<string>();
	const [selectedSchedule, setSelectedSchedule] =
		useState<FormDataSchedule | null>();
	const handleError = useHandleError();
	const { showToast } = useCustomToast();
	const [schedules, setSchedules] = useState<FormDataSchedule[]>([]);
	const [totalPages, setTotalPages] = useState(0);
	const navigate = useNavigate();
	const { loading, startLoading, stopLoading } = useLoading();
	const [timeSlots, setTimeSlots] = useState([]);

	const fetchDataTimeSlot = useCallback(
		async (date: string) => {
			if (Array.isArray(date)) return;

			try {
				const timeSlots = await getAvaliableTimesSlots(date.split("T")[0]);
				setTimeSlots(timeSlots.data.avaliableTimes);
			} catch (error) {
				handleAuthError(error, navigate);
				console.error("Erro ao buscar dados", error);
			}
		},
		[navigate, setTimeSlots],
	);

	const fetchSchedules = useCallback(async () => {
		startLoading();
		try {
			const { data } = await getSchedules(currentPage);
			setSchedules(data.schedules);
			setTotalPages(data.totalPages);
		} catch (error) {
			handleAuthError(error, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [startLoading, currentPage, navigate, stopLoading]);

	const handleSubmitSchedule = useCallback(
		async (data: FormDataSchedule) => {
			try {
				if (!selectedSchedule) {
					const createdSchedule = await createSchedule(data);
					if (createdSchedule.status === 200) {
						showToast({
							title: "Agendamento realizado com sucesso",
							status: "success",
						});
						fetchSchedules();
						closeForm();
					}
				} else {
					await updateSchedule(Number(selectedSchedule?.id), data);
					showToast({
						title: "Agendamento alterado com sucesso.",
						status: "info",
					});
					fetchSchedules();
					closeForm();
				}
			} catch (error) {
				console.error("Erro ao salvar dados", error);
				handleError(error);
			}
		},
		[selectedSchedule, showToast, fetchSchedules, closeForm, handleError],
	);

	const handleEditSchedule = useCallback(
		async (scheduleId: number) => {
			try {
				startEditing();
				const scheduleData = await getScheduleById(scheduleId);
				setSelectedSchedule(scheduleData.data);
				openForm();
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		},
		[openForm, startEditing],
	);

	const handleCancel = () => {
		reset({
			customerId: "",
			serviceId: "",
			date: "",
			status: "",
		});
		closeForm();
		stopEditing();
		setSelectedSchedule(null);
		setSelectedDate("");
	};

	useEffect(() => {
		if (!showForm) {
			fetchSchedules();
		}

		const loadTimeSlots = async () => {
			setTimeSlots([]);

			const hasValidSchedule =
				selectedSchedule && selectedSchedule.date && isEditing;

			const dateToFetch = hasValidSchedule
				? selectedSchedule.date
				: selectedDate;

			if (dateToFetch) {
				await fetchDataTimeSlot(dateToFetch);
			}
		};

		loadTimeSlots();
	}, [
		fetchDataTimeSlot,
		fetchSchedules,
		isEditing,
		selectedDate,
		selectedSchedule,
		selectedSchedule?.date,
		setTimeSlots,
		showForm,
	]);

	const handleNewClick = useCallback(() => {
		setSelectedSchedule(null);
		openForm();
		reset();
	}, [openForm, reset]);

	const handleEditClick = useCallback(
		(scheduleId: number) => {
			handleEditSchedule(scheduleId);
			setSelectedSchedule(
				(prev) => schedules.find((s) => s.id === scheduleId) || prev,
			);
		},
		[handleEditSchedule, schedules],
	);

	const handleDateChange = useCallback((date: string) => {
		setSelectedDate(date);
		setSelectedSchedule((prev) => (prev ? { ...prev, date } : null));
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
				<HeadingComponent title="Agenda" />
				{showForm ? (
					<ScheduleForm
						onSubmit={handleSubmitSchedule}
						onEdit={() => handleEditSchedule(Number(selectedSchedule))}
						onCancel={handleCancel}
						isEditing={isEditing}
						selectedSchedule={selectedSchedule}
						selectedDate={selectedDate!}
						onDateChange={handleDateChange}
						timeSlots={timeSlots}
					/>
				) : schedules.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Novo agendamento"
							onNewClick={handleNewClick}
						/>
						<TableSchedule
							schedules={schedules}
							onEditClick={handleEditClick}
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
							buttonText="Novo agendamento"
							onNewClick={handleNewClick}
						/>
						<EmptyState />
					</>
				)}
				{selectedSchedule && (
					<ModalDelete
						isOpen={isOpen}
						onClose={onClose}
						title="agendamento"
						description="Deseja excluir a agenda do dia "
						itemName={selectedSchedule.date}
					/>
				)}
			</Flex>
		</Container>
	);
}
