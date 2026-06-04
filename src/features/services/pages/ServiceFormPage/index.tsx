import { useNavigate, useParams } from "react-router-dom";
import ServiceForm from "../../components/Form";
import { FormDataService } from "../../interface/FormDataService";
import { createService, updateService } from "../../services/api";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useHandleError } from "@/shared/hooks/useHandleError";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { getServicesById as getServiceById } from "../../services/api";
import { convertToMinutes } from "@/utils/convertToMinutes";

export default function ServiceFormPage() {
	const { id } = useParams();
	const serviceId = id ? Number(id) : undefined;
	const navigate = useNavigate();
	const { showToast } = useCustomToast();
	const handleError = useHandleError();
	const queryClient = useQueryClient();

	const isEditing = !!id;

	const handleCancel = () => {
		navigate("/service");
	};

	const mutation = useMutation({
		mutationFn: (data: FormDataService) => {
			return !isEditing ? createService(data) : updateService(Number(id), data);
		},
		onSuccess: () => {
			showToast({
				title: !isEditing
					? "Serviço registrado com sucesso."
					: "Serviço alterado com sucesso.",
				status: !isEditing ? "success" : "info",
			});
			queryClient.invalidateQueries({ queryKey: ["services"] });
			navigate("/service");
		},
		onError: (error) => {
			handleError(error);
		},
	});

	const handleSubmitService = (data: FormDataService) => {
		const durationInMinutes = convertToMinutes(data.duration as string);
		mutation.mutate({ ...data, duration: durationInMinutes });
	};

	const { data: selectedService, isLoading } = useQuery({
		queryKey: ["service", serviceId],
		queryFn: () => getServiceById(serviceId!),
		enabled: !!serviceId,
		placeholderData: keepPreviousData,
	});

	return (
		<ServiceForm
			onSubmit={handleSubmitService}
			onEdit={handleSubmitService}
			onCancel={handleCancel}
			selectedService={selectedService}
			isEditing={isEditing}
			isLoading={isLoading}
		/>
	);
}
