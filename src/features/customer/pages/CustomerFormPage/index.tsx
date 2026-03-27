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
	createCustomer,
	getCustomerById,
	updateCustomer,
} from "../../services/api";
import { FormDataCustomer } from "../../interface/FormDataCustomer";
import CustomerForm from "../../components/Form";

export default function CustomerFormPage() {
	const { id } = useParams();
	const customerId = id ? Number(id) : 0;
	const navigate = useNavigate();
	const { showToast } = useCustomToast();
	const handleError = useHandleError();
	const queryClient = useQueryClient();

	const isEditing = !!id;

	const handleCancel = () => {
		navigate("/customer");
	};

	const mutation = useMutation({
		mutationFn: (data: FormDataCustomer) => {
			return !isEditing
				? createCustomer(data)
				: updateCustomer(Number(id), data);
		},
		onSuccess: () => {
			showToast({
				title: !isEditing
					? "Cliente registrado com sucesso."
					: "Cliente alterado com sucesso.",
				status: !isEditing ? "success" : "info",
			});
			queryClient.invalidateQueries({ queryKey: ["customer"] });
			navigate("/customer");
		},
		onError: (error) => {
			handleError(error);
		},
	});

	const handleSubmitCustomer = (data: FormDataCustomer) => {
		mutation.mutate(data);
	};

	const { data: selectedCustomer, isLoading } = useQuery({
		queryKey: ["customer", customerId],
		queryFn: () => getCustomerById(customerId),
		enabled: !!customerId,
		placeholderData: keepPreviousData,
	});

	return (
		<CustomerForm
			onSubmit={handleSubmitCustomer}
			onEdit={handleSubmitCustomer}
			onCancel={handleCancel}
			selectedCustomer={selectedCustomer}
			isEditing={isEditing}
			isLoading={isLoading}
		/>
	);
}
