import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { availableTimeSchema } from "../validators/availableTimeSchema";
import { FormDataAvailableTime } from "../interface/FormDataAvailableTime";
import { useCallback, useEffect, useState } from "react";
import TableAvaliable from "../components/TableAvaliable";
import SectionHeader from "../../../shared/components/SectionHeader";
import AvailableTime from "../components/AvailableTime";
import RegisterButton from "../../../shared/components/RegisterButton";
import EmptyState from "../../../shared/components/EmptyState";
import Pagination from "../../../shared/components/Pagination";
import { useAvaliableTime } from "../hooks/useAvaliableTime";
import { usePagination } from "../../../shared/hooks/usePagination";
import { useAvaliableTimeSubmit } from "../hooks/useAvaliableTimeSubmit";
import { useAvaliableTimeEdit } from "../hooks/useAvaliableTimeEdit";
import { useAvaliableTimeCancel } from "../hooks/useAvaliableTimeCancel";
import ModalDelete from "../../../shared/components/Modal";
import { useAvaliableTimeDelete } from "../hooks/useAvaliableTimeDelete";
import { useAvaliableTimeOpenModalDelete } from "../hooks/useAvaliableTimeOpenDeleteModal";
import { dayMapping } from "../../../utils/dayMapping";
import { useShowForm } from "../../../shared/hooks/useShowForm";
import { useEditMode } from "../../../shared/hooks/useEditMode";

export default function AvaliableTimePage() {
	const { reset } = useForm<FormDataAvailableTime>({
		resolver: yupResolver(availableTimeSchema),
	});

	const { currentPage, handlePrev, handleNext } = usePagination();
	const { showForm, openForm, closeForm } = useShowForm();
	const { isEditing, startEditing, stopEditing } = useEditMode();
	const [selectedAvaliableTime, setSelectAvaliableTime] =
		useState<FormDataAvailableTime | null>();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { availableTime, totalPages, loading, fetchAvaliableTime } =
		useAvaliableTime(currentPage);

	const { handleSubmitAvaliableTime } = useAvaliableTimeSubmit({
		selectedAvaliableTime,
		fetchAvaliableTime,
		closeForm,
	});

	const { handleEditAvaliableTime } = useAvaliableTimeEdit({
		setSelectAvaliableTime,
		openForm,
		startEditing,
	});

	const { handleAvaliableTimeOpenDeleteModal } =
		useAvaliableTimeOpenModalDelete({
			onOpen,
			setSelectAvaliableTime,
		});

	const { handleDeleteAvaliableTime } = useAvaliableTimeDelete({
		onClose,
		fetchAvaliableTime,
		selectedAvaliableTime,
		setSelectAvaliableTime,
		closeForm,
	});

	const { handleCancel } = useAvaliableTimeCancel({
		reset,
		closeForm,
		stopEditing,
	});

	useEffect(() => {
		if (!showForm) {
			fetchAvaliableTime();
		}
	}, [fetchAvaliableTime, showForm]);

	const handleNewClick = useCallback(() => {
		setSelectAvaliableTime(null);
		openForm();
	}, [openForm]);

	const handleEditClick = useCallback(
		(avaliableTimeId: number) => {
			handleEditAvaliableTime(avaliableTimeId);
		},
		[handleEditAvaliableTime]
	);

	const handleDeleteClick = useCallback(
		(avaliableTimeId: number) => {
			handleAvaliableTimeOpenDeleteModal(avaliableTimeId);
		},
		[handleAvaliableTimeOpenDeleteModal]
	);

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
				<SectionHeader title="Horário disponíveis" />

				{showForm ? (
					<AvailableTime
						onSubmit={handleSubmitAvaliableTime}
						onEdit={() =>
							handleEditAvaliableTime(Number(selectedAvaliableTime))
						}
						onCancel={handleCancel}
						isEditing={isEditing}
						selectedAvaliableTime={selectedAvaliableTime}
					/>
				) : availableTime.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Novo horário"
							onNewClick={handleNewClick}
						/>
						<TableAvaliable
							availables={availableTime}
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
							buttonText="Novo horário"
							onNewClick={handleNewClick}
						/>
						<EmptyState />
					</>
				)}
				{selectedAvaliableTime && (
					<ModalDelete
						isOpen={isOpen}
						onClose={onClose}
						title="horário disponível"
						itemName={dayMapping[selectedAvaliableTime?.day]}
						description="Deseja excluir o horário indisponível na "
						onDelete={handleDeleteAvaliableTime}
					/>
				)}
			</Flex>
		</Container>
	);
}
