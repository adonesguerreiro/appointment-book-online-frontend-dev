import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerSchema } from "./customerSchema";
import { FormDataCustomer } from "../../interface/FormDataCustomer";
import TableCustomer from "./TableCustomer";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
	createCustomer,
	getCustomers,
	getCustomerById,
	updateCustomer,
	deleteCustomer,
} from "../../services/api";
import SectionHeader from "../../components/SectionHeader";
import CustomerForm from "../../components/Form/Customer";
import ModalDelete from "../../components/Modal";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../interface/CustomJwtPayload";
import { useHandleError } from "../../hooks/useHandleError";
import { useNavigate } from "react-router-dom";
import { handleAuthError } from "../../utils/handleAuthError";
import RegisterButton from "../../components/RegisterButton";
import EmptyState from "../../components/EmptyState";
import Pagination from "../../components/Pagination";
import { useCustomToast } from "../../hooks/useCustomToast";

export default function CustomerPage() {
	const { reset } = useForm<FormDataCustomer>({
		resolver: yupResolver(customerSchema),
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [customers, setCustomers] = useState<FormDataCustomer[]>([]);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [selectedCustomer, setSelectedCustomer] =
		useState<FormDataCustomer | null>();
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { showToast } = useCustomToast();
	const handleError = useHandleError();

	const { token, logout } = useAuth();

	const handleSubmitCustomer = async (data: FormDataCustomer) => {
		try {
			if (token && !selectedCustomer) {
				const createdCustomer = await createCustomer(data);
				if (createdCustomer.status === 200) {
					showToast({
						title: "Cliente registrado com sucesso.",
						status: "success",
					});
					fetchData();
					setShowForm(false);
				}
			} else {
				await updateCustomer(Number(selectedCustomer?.id), data);
				showToast({
					title: "Cliente alterado com sucesso.",
					status: "info",
				});
				fetchData();
				setShowForm(false);
			}
		} catch (error) {
			console.error("Erro ao salvar dados", error);
			handleError(error);
		}
	};

	const handleEditCustomer = async (customerId: number) => {
		try {
			setIsEditing(true);
			const customerData = await getCustomerById(customerId);

			setSelectedCustomer(customerData.data);
			setShowForm(true);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	const handleDeleteCustomer = useCallback(
		async (customerId: number) => {
			try {
				const customerData = await getCustomerById(customerId);

				setSelectedCustomer(customerData.data);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do serviço", error);
			}
		},
		[onOpen]
	);

	const onDeleteCustomer = async () => {
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
				setShowForm(false);
				setSelectedCustomer(null);
				fetchData();
			}
		} catch (error) {
			console.error("Erro ao excluir serviço", error);
		}
	};

	const handleCancel = () => {
		reset({
			customerName: "",
			mobile: "",
		});
		setShowForm(false);
		setIsEditing(false);
	};

	const fetchData = useCallback(async () => {
		if (!token) return;
		setLoading(true);

		try {
			const decoded = jwtDecode<CustomJwtPayload>(token);
			const companyId = decoded.id;
			const customerData = await getCustomers(companyId, currentPage);
			setCustomers(customerData.data.customers);
			setTotalPages(customerData.data.totalPages);
		} catch (error) {
			handleAuthError(error, logout, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			setLoading(false);
		}
	}, [token, currentPage, logout, navigate]);

	useEffect(() => {
		fetchData();
	}, [fetchData, token]);

	const handleNewClick = useCallback(() => {
		setSelectedCustomer(null);
		setShowForm(true);
	}, []);

	const handleEditClick = useCallback((customerId: number) => {
		handleEditCustomer(customerId);
	}, []);

	const handleDeleteClick = useCallback(
		(customerId: number) => {
			handleDeleteCustomer(customerId);
		},
		[handleDeleteCustomer]
	);

	const handleNext = () => setCurrentPage((prev) => prev + 1);
	const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
						onDelete={onDeleteCustomer}
					/>
				)}
			</Flex>
		</Container>
	);
}
