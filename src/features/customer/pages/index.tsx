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
import { useCustomer } from "../hooks/useCustomer";
import { useCustomerSubmit } from "../hooks/useCustomerSubmit";
import { useCustomerEdit } from "../hooks/useCustomerEdit";
import { useCustomerOpenDeleteModal } from "../hooks/useCustomerOpenDeleteModal";
import { usePagination } from "../../../shared/hooks/usePagination";
import { useCustomerDelete } from "../hooks/useCustomerDelete";
import { useCustomerCancel } from "../hooks/useCustomerCancel";
import { useShowForm } from "../../../shared/hooks/useShowForm";
import { useEditMode } from "../../../shared/hooks/useEditMode";

export default function CustomerPage() {
	const { reset } = useForm<FormDataCustomer>({
		resolver: yupResolver(customerSchema),
	});
	const { currentPage, handlePrev, handleNext } = usePagination();
	const { showForm, openForm, closeForm } = useShowForm();
	const { isEditing, startEditing, stopEditing } = useEditMode();
	const [selectedCustomer, setSelectedCustomer] =
		useState<FormDataCustomer | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { customers, totalPages, loading, fetchCustomer } =
		useCustomer(currentPage);

	const { handleSubmitCustomer } = useCustomerSubmit({
		selectedCustomer,
		fetchCustomer,
		closeForm,
	});

	const { handleEditCustomer } = useCustomerEdit({
		setSelectedCustomer,
		openForm,
		startEditing,
	});

	const { handleCustomerOpenModalDelete } = useCustomerOpenDeleteModal({
		setSelectedCustomer,
		onOpen,
	});

	const { handleDeleteCustomer } = useCustomerDelete({
		onClose,
		closeForm,
		fetchCustomer,
		selectedCustomer,
		setSelectedCustomer,
	});

	const { handleCancel } = useCustomerCancel({
		reset,
		closeForm,
		stopEditing,
	});

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
