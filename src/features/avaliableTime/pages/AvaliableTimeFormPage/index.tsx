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
	createAvaliableTime,
	getAvaliableTimeById,
	updateAvaliableTime,
} from "../../services/api";
import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";
import AvaliableTimeForm from "../../components/Form";

export default function AvaliableTimeFormPage() {
	const { id } = useParams();
	const avaliableTimeId = id ? Number(id) : undefined;
	const navigate = useNavigate();
	const { showToast } = useCustomToast();
	const handleError = useHandleError();
	const queryClient = useQueryClient();

	const isEditing = !!id;

	const handleCancel = () => {
		navigate("/avaliable-time");
	};

	const mutation = useMutation({
		mutationFn: (data: FormDataAvailableTime) => {
			return !isEditing
				? createAvaliableTime(data)
				: updateAvaliableTime(Number(id), data);
		},
		onSuccess: () => {
			showToast({
				title: !isEditing
					? "Horário disponível registrado com sucesso."
					: "Horário disponível alterado com sucesso.",
				status: !isEditing ? "success" : "info",
			});
			queryClient.invalidateQueries({ queryKey: ["avaliable-time"] });
			navigate("/avaliable-time");
		},
		onError: (error) => {
			handleError(error);
		},
	});

	const handleSubmitService = (data: FormDataAvailableTime) => {
		mutation.mutate(data);
	};

	const { data: selectedAvaliableTime, isLoading } = useQuery({
		queryKey: ["avaliable-time", avaliableTimeId],
		queryFn: () => getAvaliableTimeById(avaliableTimeId!),
		enabled: !!avaliableTimeId,
		placeholderData: keepPreviousData,
	});

	return (
		<AvaliableTimeForm
			onSubmit={handleSubmitService}
			onEdit={handleSubmitService}
			onCancel={handleCancel}
			selectedAvaliableTime={selectedAvaliableTime}
			isEditing={isEditing}
			isLoading={isLoading}
		/>
	);
}
