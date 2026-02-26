import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerSchema } from "../validators/customerSchema";
import { FormDataCustomer } from "../interface/FormDataCustomer";
import TableCustomer from "../components/TableCustomer";
import { useCallback, useEffect, useState } from "react";
import SectionHeader from "../../../shared/components/SectionHeader";
import CustomerForm from "../components/Form";
import ModalDelete from "../../../shared/components/Modal";
import RegisterButton from "../../../shared/components/RegisterButton";
import EmptyState from "../../../shared/components/EmptyState";
import Pagination from "../../../shared/components/Pagination";
import { usePagination } from "../../../shared/hooks/usePagination";
import { useShowForm } from "../../../shared/hooks/useShowForm";
import { useEditMode } from "../../../shared/hooks/useEditMode";
import { createCustomer, deleteCustomer, getCustomerById, getCustomers, updateCustomer } from "../services/api";
import { useHandleError } from "../../../shared/hooks/useHandleError";
import { useCustomToast } from "../../../shared/hooks/useCustomToast";
import { useLoading } from "@/shared/hooks/useLoading";
import { useNavigate } from "react-router-dom";
import { handleAuthError } from "@/utils/handleAuthError";

export default function CustomerPage() {
	const { reset } = useForm<FormDataCustomer>({
		resolver: yupResolver(customerSchema),
	});

	const [customers, setCustomers] = useState<FormDataCustomer[]>([]);
	const [totalPages, setTotalPages] = useState(0);
	const { currentPage, handlePrev, handleNext } = usePagination();
	const { showForm, openForm, closeForm } = useShowForm();
	const { isEditing, startEditing, stopEditing } = useEditMode();
	const [selectedCustomer, setSelectedCustomer] =
		useState<FormDataCustomer | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { loading, startLoading, stopLoading } = useLoading();

	const navigate = useNavigate();
	const handleError = useHandleError();
	const { showToast } = useCustomToast();

	const fetchCustomer = useCallback(async () => {
		startLoading();
		try {
			const { data } = await getCustomers(currentPage);
			setCustomers(data.customers);
			setTotalPages(data.totalPages);
		} catch (error) {
			handleAuthError(error, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			stopLoading();
		}
	}, [startLoading, currentPage, navigate, stopLoading]);


	const handleSubmitCustomer = useCallback(
			async (data: FormDataCustomer) => {
				try {
					if (!selectedCustomer) {
						const createdCustomer = await createCustomer(data);
						if (createdCustomer.status === 200) {
							showToast({
								title: "Cliente registrado com sucesso.",
								status: "success",
							});
							fetchCustomer();
							closeForm();
						}
					} else {
						await updateCustomer(Number(selectedCustomer?.id), data);
						showToast({
							title: "Cliente alterado com sucesso.",
							status: "info",
						});
						fetchCustomer();
						closeForm();
					}
				} catch (error) {
					console.error("Erro ao salvar dados", error);
					handleError(error);
				}
			},
			[closeForm, fetchCustomer, selectedCustomer, showToast, handleError]);

	const handleEditCustomer = useCallback(async (customerId: number) => {
			try {
				startEditing();
				const customerData = await getCustomerById(customerId);
				setSelectedCustomer(customerData.data);
				openForm();
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		},[startEditing, openForm, setSelectedCustomer]);

	const handleCustomerOpenModalDelete = useCallback(
		async (customerId: number) => {
			try {
				const customerData = await getCustomerById(customerId);

				setSelectedCustomer(customerData.data);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do serviço", error);
			}
		},
		[onOpen, setSelectedCustomer]
	);

	const handleDeleteCustomer = useCallback(async () => {
			if (!selectedCustomer || !selectedCustomer.id) {
				console.error("Cliente selecionado não encontrado.");
				return;
			}

			try {
				const deletedCustomer = await deleteCustomer(selectedCustomer.id);
				if (deletedCustomer.status === 200) {
					onClose();
					showToast({
						title: "Cliente excluído com sucesso.",
						status: "success",
					});
					closeForm();
					setSelectedCustomer(null);
					fetchCustomer();
				}
			} catch (error) {
				console.error("Erro ao excluir cliente", error);
				onClose();
				handleError(error);
			}
		}, [closeForm, fetchCustomer, handleError, onClose, selectedCustomer, showToast]);

	const handleCancel = () => {
		reset({
			customerName: "",
			mobile: "",
		});
		closeForm();
		stopEditing();
	};

	useEffect(() => {
		if (!showForm) {
			fetchCustomer();
		}
	}, [fetchCustomer, showForm]);

	const handleNewClick = useCallback(() => {
		setSelectedCustomer(null);
		openForm();
	}, [openForm]);

	const handleEditClick = useCallback(
		(customerId: number) => {
			handleEditCustomer(customerId);
		},
		[handleEditCustomer]
	);

	const handleDeleteClick = useCallback(
		(customerId: number) => {
			handleCustomerOpenModalDelete(customerId);
		},
		[handleCustomerOpenModalDelete]
	);

	return loading ? (
		<Spinner />
	) : (
		<Container>
			<Flex
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<SectionHeader title="Cliente" />

				{showForm ? (
					<CustomerForm
						onSubmit={handleSubmitCustomer}
						onEdit={() => handleEditCustomer(Number(selectedCustomer))}
						onCancel={handleCancel}
						isEditing={isEditing}
						selectedCustomer={selectedCustomer}
					/>
				) : customers.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Novo cliente"
							onNewClick={handleNewClick}
						/>
						<TableCustomer
							customers={customers}
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
							buttonText="Novo cliente"
							onNewClick={handleNewClick}
						/>
						<EmptyState />
					</>
				)}

				{selectedCustomer && (
					<ModalDelete
						isOpen={isOpen}
						onClose={onClose}
						title="cliente"
						itemName={selectedCustomer.customerName}
						description="Tem certeza que deseja excluir o cliente "
						onDelete={handleDeleteCustomer}
					/>
				)}
			</Flex>
		</Container>
	);
}
