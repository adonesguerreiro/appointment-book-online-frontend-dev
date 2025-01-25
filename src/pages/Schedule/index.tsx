import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import TableSchedule from "./TableSchedule";
import { scheduleSchema } from "../../validators/scheduleSchema";
import { FormDataSchedule } from "../../interface/FormDataSchedule";
import ScheduleForm from "../../components/Form/Schedule";
import ModalDelete from "../../components/Modal";
import RegisterButton from "../../components/RegisterButton";
import EmptyState from "../../components/EmptyState";
import Pagination from "../../components/Pagination";
import { useSchedules } from "../../hooks/Schedule/useSchedule";
import HeadingComponent from "../../components/Heading";
import { useTimeSlots } from "../../hooks/Schedule/useTimeSlot";
import { usePagination } from "../../hooks/usePagination";
import { useScheduleSubmit } from "../../hooks/Schedule/useScheduleSubmit";
import { useScheduleEdit } from "../../hooks/Schedule/useScheduleEdit";
import { useScheduleCancel } from "../../hooks/Schedule/useScheduleCancel";
import { useShowForm } from "../../hooks/useShowForm";
import { useEditMode } from "../../hooks/useEditMode";

export default function SchedulePage() {
	const { reset } = useForm<FormDataSchedule>({
		resolver: yupResolver(scheduleSchema),
	});
	const { showForm, openForm, closeForm } = useShowForm();
	const { currentPage, handlePrev, handleNext } = usePagination();
	const { fetchSchedules, schedules, totalPages, loading } =
		useSchedules(currentPage);
	const { timeSlots, setTimeSlots, fetchDataTimeSlot } = useTimeSlots();
	const { isEditing, startEditing, stopEditing } = useEditMode();
	const { isOpen, onClose } = useDisclosure();
	const [selectedDate, setSelectedDate] = useState<string>();
	const [selectedSchedule, setSelectedSchedule] =
		useState<FormDataSchedule | null>();

	const { handleSubmitSchedule } = useScheduleSubmit({
		selectedSchedule,
		fetchSchedules,
		closeForm,
	});

	const { handleEditSchedule } = useScheduleEdit({
		setSelectedSchedule,
		openForm,
		startEditing,
	});

	const { handleCancel } = useScheduleCancel({
		reset,
		setSelectedDate,
		setSelectedSchedule,
		closeForm,
		stopEditing,
	});

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
				(prev) => schedules.find((s) => s.id === scheduleId) || prev
			);
		},
		[handleEditSchedule, schedules]
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
