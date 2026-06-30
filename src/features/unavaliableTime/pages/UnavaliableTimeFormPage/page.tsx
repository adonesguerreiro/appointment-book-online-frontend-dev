import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useHandleError } from "@/shared/hooks/useHandleError";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";
import {
	createUnavailableTime,
	getUnavailableTimeById,
	updateUnavailableTime,
} from "../../services/api";
import UnavailableTimeForm from "../../components/Form";
export default function UnavailableTimeFormPage() {
	const { id } = useParams();
	const unavaliableTimeId = id ? Number(id) : undefined;
	const navigate = useNavigate();
	const { showToast } = useCustomToast();
	const handleError = useHandleError();
	const queryClient = useQueryClient();

	const isEditing = !!id;

	const handleCancel = () => {
		navigate("/unavaliable-time");
	};

	const mutation = useMutation({
		mutationFn: (data: FormDataUnavailableTime) => {
			return !isEditing
				? createUnavailableTime(data)
				: updateUnavailableTime(Number(id), data);
		},
		onSuccess: () => {
			showToast({
				title: !isEditing
					? "Horário indisponível registrado com sucesso."
					: "Horário indisponível alterado com sucesso.",
				status: !isEditing ? "success" : "info",
			});
			queryClient.invalidateQueries({ queryKey: ["unavaliable-time"] });
			navigate("/unavaliable-time");
		},
		onError: (error) => {
			handleError(error);
		},
	});

	const handleSubmitService = (data: FormDataUnavailableTime) => {
		mutation.mutate(data);
	};

	const { data: unavaliableTime, isLoading } = useQuery({
		queryKey: ["unavailable-time", unavaliableTimeId],
		queryFn: () => getUnavailableTimeById(unavaliableTimeId!),
		enabled: !!unavaliableTimeId,
		placeholderData: keepPreviousData,
	});

	return (
		<UnavailableTimeForm
			onSubmit={handleSubmitService}
			onEdit={handleSubmitService}
			onCancel={handleCancel}
			selectedUnavailableTime={unavaliableTime}
			isEditing={isEditing}
			isLoading={isLoading}
		/>
	);
}
