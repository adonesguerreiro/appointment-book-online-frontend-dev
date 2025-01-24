import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { availableTimeSchema } from "../../validators/availableTimeSchema";
import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";
import { useCallback, useEffect, useState } from "react";
import TableAvaliable from "./TableAvaliable";
import SectionHeader from "../../components/SectionHeader";
import AvailableTime from "../../components/Form/AvailableTime";
import RegisterButton from "../../components/RegisterButton";
import EmptyState from "../../components/EmptyState";
import Pagination from "../../components/Pagination";
import { useAvaliableTime } from "../../hooks/AvaliableTime/useAvaliableTime";
import { usePagination } from "../../hooks/usePagination";
import { useAvaliableTimeSubmit } from "../../hooks/AvaliableTime/useAvaliableTimeSubmit";
import { useAvaliableTimeEdit } from "../../hooks/AvaliableTime/useAvaliableTimeEdit";
import { useAvaliableTimeCancel } from "../../hooks/AvaliableTime/useAvaliableTimeCancel";
import ModalDelete from "../../components/Modal";
import { useAvaliableTimeDelete } from "../../hooks/AvaliableTime/useAvaliableTimeDelete";
import { useAvaliableTimeOpenModalDelete } from "../../hooks/AvaliableTime/useAvaliableTimeOpenDeleteModal";
import { dayMapping } from "../../utils/dayMapping";
import { useShowForm } from "../../hooks/useShowForm";

export default function AvaliableTimePage() {
	const { reset } = useForm<FormDataAvailableTime>({
		resolver: yupResolver(availableTimeSchema),
	});

	const { currentPage, handlePrev, handleNext } = usePagination();
	const { showForm, openForm, closeForm } = useShowForm();
	const [selectedAvaliableTime, setSelectAvaliableTime] =
		useState<FormDataAvailableTime | null>();
	const [isEditing, setIsEditing] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { availableTime, totalPages, loading, fetchAvaliableTime } =
		useAvaliableTime(currentPage);

	const { handleSubmitAvaliableTime } = useAvaliableTimeSubmit({
		selectedAvaliableTime,
		fetchAvaliableTime,
		closeForm,
	});

	const { handleEditAvaliableTime } = useAvaliableTimeEdit({
		setIsEditing,
		setSelectAvaliableTime,
		openForm,
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
		setIsEditing,
		closeForm,
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
