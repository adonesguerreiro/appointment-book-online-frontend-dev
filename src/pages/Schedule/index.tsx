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

export default function SchedulePage() {
	const { reset } = useForm<FormDataSchedule>({
		resolver: yupResolver(scheduleSchema),
	});
	const { currentPage, handlePrev, handleNext } = usePagination();
	const { fetchSchedules, schedules, totalPages, loading } =
		useSchedules(currentPage);
	const { timeSlots, setTimeSlots, fetchDataTimeSlot } = useTimeSlots();

	const [selectedDate, setSelectedDate] = useState<string>();
	const [showForm, setShowForm] = useState(false);
	const [selectedSchedule, setSelectedSchedule] =
		useState<FormDataSchedule | null>();
	const [isEditing, setIsEditing] = useState(false);

	const { isOpen, onClose } = useDisclosure();

	const { handleSubmitSchedule } = useScheduleSubmit({
		selectedSchedule,
		fetchSchedules,
		setShowForm,
	});

	const { handleEditSchedule } = useScheduleEdit({
		setShowForm,
		setIsEditing,
		setSelectedSchedule,
	});

	const { handleCancel } = useScheduleCancel({
		reset,
		setSelectedDate,
		setShowForm,
		setIsEditing,
		setSelectedSchedule,
	});

	useEffect(() => {
		fetchSchedules();
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
	]);

	const handleNewClick = useCallback(() => {
		setSelectedSchedule(null);
		setShowForm(true);
	}, []);

	const handleEditClick = useCallback(
		(scheduleId: number) => {
			handleEditSchedule(scheduleId);
		},
		[handleEditSchedule]
	);

	const handleDateChange = useCallback((date: string) => {
		setSelectedDate(date);
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
						selectedDate={selectedDate || ""}
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
						itemName={selectedSchedule.date}
					/>
				)}
			</Flex>
		</Container>
	);
}
