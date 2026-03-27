import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useHandleError } from "@/shared/hooks/useHandleError";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
	createSchedule,
	getScheduleById,
	updateSchedule,
} from "../../services/api";
import { FormDataSchedule } from "../../interface/FormDataSchedule";
import ScheduleForm from "../../components/Form";
import { useState } from "react";
import { getAvaliableTimesSlots } from "@/features/avaliableTime/services/api";

export default function ScheduleFormPage() {
	const { id } = useParams();
	const scheduleId = id ? Number(id) : 0;
	const navigate = useNavigate();
	const { showToast } = useCustomToast();
	const handleError = useHandleError();
	const queryClient = useQueryClient();

	const isEditing = !!id;
	const [selectedDate, setSelectedDate] = useState<string>();

	const handleCancel = () => {
		navigate("/schedule");
	};

	const mutation = useMutation({
		mutationFn: (data: FormDataSchedule) => {
			return !isEditing
				? createSchedule(data)
				: updateSchedule(Number(id), data);
		},
		onSuccess: () => {
			showToast({
				title: !isEditing
					? "Agendamento registrado com sucesso."
					: "Agendamento alterado com sucesso.",
				status: !isEditing ? "success" : "info",
			});
			queryClient.invalidateQueries({ queryKey: ["schedule"] });
			navigate("/schedule");
		},
		onError: (error) => {
			handleError(error);
		},
	});

	const handleSubmitCustomer = (data: FormDataSchedule) => {
		mutation.mutate(data);
	};

	const { data: selectedSchedule, isLoading } = useQuery({
		queryKey: ["schedule", scheduleId],
		queryFn: () => getScheduleById(scheduleId),
		enabled: !!scheduleId,
		placeholderData: keepPreviousData,
	});

	const formattedDate = selectedDate?.split("T")[0];

	const { data: timeSlots } = useQuery({
		queryKey: ["schedule", scheduleId],
		queryFn: async () => {
			const timeSlotsData = await getAvaliableTimesSlots(formattedDate!);
			return timeSlotsData.avaliableTimes;
		},
		enabled: !!scheduleId,
		placeholderData: keepPreviousData,
	});

	return (
		<ScheduleForm
			onSubmit={handleSubmitCustomer}
			onEdit={handleSubmitCustomer}
			onCancel={handleCancel}
			selectedDate={selectedDate ?? ""}
			selectedSchedule={selectedSchedule}
			timeSlots={timeSlots}
			isEditing={isEditing}
			isLoading={isLoading}
			onDateChange={setSelectedDate}
		/>
	);
}
