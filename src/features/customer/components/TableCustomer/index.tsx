import { Flex, Box, Container, useDisclosure, Spinner } from "@chakra-ui/react";
import { FormDataCustomer } from "../../interface/FormDataCustomer";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import DynamicTable, {
	ColumnConfig,
} from "../../../../shared/components/DynamicTable";
import SectionHeader from "@/shared/components/SectionHeader";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useHandleError } from "@/shared/hooks/useHandleError";
import { usePagination } from "@/shared/hooks/usePagination";
import { useShowForm } from "@/shared/hooks/useShowForm";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
	deleteCustomer,
	getCustomerById,
	getCustomers,
} from "../../services/api";
import RegisterButton from "@/shared/components/RegisterButton";
import Pagination from "@/shared/components/Pagination";
import EmptyState from "@/shared/components/EmptyState";
import ModalDelete from "@/shared/components/Modal";

export default function TableCustomer() {
	const { currentPage } = usePagination();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { closeForm } = useShowForm();
	const [selectedCustomer, setSelectedCustomer] =
		useState<FormDataCustomer | null>(null);
	const { showToast } = useCustomToast();
	const handleError = useHandleError();
	const queryClient = useQueryClient();

	const {
		data: customers,
		isLoading,
		isRefetching,
	} = useQuery({
		queryKey: ["customer", currentPage],
		queryFn: () => getCustomers(currentPage),
	});

	const handleNewClick = useCallback(() => {
		navigate("/customer/new");
	}, [navigate]);

	const onEditClick = useCallback(
		(customerId: number) => {
			navigate(`/customer/${customerId}`);
		},
		[navigate],
	);

	const onDeleteClick = useCallback(
		async (customerId: number) => {
			try {
				const customerData = await getCustomerById(customerId);
				setSelectedCustomer(customerData);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do serviço", error);
			}
		},
		[onOpen],
	);

	const mutation = useMutation({
		mutationFn: (customerId: number) => deleteCustomer(customerId),
		onSuccess: () => {
			showToast({
				title: "Cliente excluído com sucesso.",
				status: "success",
			});
			closeForm();
			setSelectedCustomer(null);
			queryClient.invalidateQueries({ queryKey: ["customer"] });
		},
		onError: (error: unknown) => {
			onClose();
			handleError(error);
		},
	});

	const handleDeleteCustomer = () => {
		if (!selectedCustomer || !selectedCustomer.id) {
			showToast({
				title: "Cliente não encontrado.",
				status: "error",
			});
			return;
		}
		mutation.mutate(selectedCustomer.id);
	};

	const columnsCustomer: ColumnConfig<FormDataCustomer>[] = [
		{
			key: "customerName",
			label: "Nome",
			hideOnMobile: false,
		},
		{
			key: "mobile",
			label: "Celular",
			hideOnMobile: true,
		},
	];

	const openModal = !!selectedCustomer;

	return (
		<Container>
			<Flex
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<SectionHeader title="Clientes" />
				{isLoading || isRefetching ? (
					<Spinner />
				) : customers?.customers?.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Novo cliente"
							onNewClick={handleNewClick}
						/>
						<DynamicTable
							columns={columnsCustomer}
							data={customers?.customers ?? []}
							actions={(row: FormDataCustomer) => (
								<Flex>
									<Box _hover={{ color: "blue", cursor: "pointer" }}>
										<TbEdit
											onClick={() => onEditClick(row.id!)}
											fontSize="1.5rem"
										/>
									</Box>
									<Box _hover={{ color: "red", cursor: "pointer" }}>
										<RiDeleteBin5Line
											onClick={() => onDeleteClick(row.id!)}
											fontSize="1.5rem"
										/>
									</Box>
								</Flex>
							)}
						/>
						<Pagination totalPages={customers?.totalPages} />
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
			</Flex>
			{openModal && (
				<ModalDelete
					isOpen={isOpen}
					onClose={onClose}
					title="horário disponível"
					itemName={selectedCustomer?.customerName ?? ""}
					description="Tem certeza que deseja excluir o horário disponível "
					onDelete={handleDeleteCustomer}
				/>
			)}
		</Container>
	);
}
