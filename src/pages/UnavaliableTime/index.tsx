import { Container, Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { unavailableTimeSchema } from "../../validators/unavailableTimeSchema";
import { useCallback, useEffect, useState } from "react";
import TableUnavaliable from "./TableUnavaliable";
import UnavailableTimeForm from "../../components/Form/UnavailableTime";
import SectionHeader from "../../components/SectionHeader";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";
import ModalDelete from "../../components/Modal";
import EmptyState from "../../components/EmptyState";
import RegisterButton from "../../components/RegisterButton";
import Pagination from "../../components/Pagination";
import { useUnavaliableTime } from "../../hooks/UnavaliableTime/useUnavaliableTime";
import { usePagination } from "../../hooks/usePagination";
import { useUnavaliableTimeSubmit } from "../../hooks/UnavaliableTime/useUnavaliableTimeSubmit";
import { useUnavaliableTimeEdit } from "../../hooks/UnavaliableTime/useUnavaliableTimeEdit";
import { useUnavaliableTimeOpenModal } from "../../hooks/UnavaliableTime/useUnavaliableTimeOpenDeleteModal";
import { useUnavaliableTimeDelete } from "../../hooks/UnavaliableTime/useUnavaliableTimeDelete";
import { useUnavailableTimeCancel } from "../../hooks/UnavaliableTime/useUnavaliableTimeCancel";

export default function UnavaliableTimePage() {
	const [showForm, setShowForm] = useState(false);
	const [selectedUnavailableTime, setSelectedUnavailableTime] =
		useState<FormDataUnavailableTime | null>(null);
	const [isEditing, setIsEditing] = useState(false);

	const { reset } = useForm<FormDataUnavailableTime>({
		resolver: yupResolver(unavailableTimeSchema),
	});

	const { currentPage, handlePrev, handleNext } = usePagination();
	const { fetchUnavaliableTime, unavaliables, totalPages, loading } =
		useUnavaliableTime(currentPage);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { handleSubmitUnavailableTime } = useUnavaliableTimeSubmit({
		fetchUnavaliableTime,
		setShowForm,
		selectedUnavailableTime,
	});

	const { handleEditUnavailableTime } = useUnavaliableTimeEdit({
		setIsEditing,
		setShowForm,
		setSelectedUnavailableTime,
	});

	const { handleUnavaliableTimeOpenModal } = useUnavaliableTimeOpenModal({
		onOpen,
		setSelectedUnavailableTime,
	});

	const { handleDeleteUnavailableTime } = useUnavaliableTimeDelete({
		onClose,
		setShowForm,
		fetchUnavaliableTime,
		selectedUnavailableTime,
		setSelectedUnavailableTime,
	});

	const { handleCancel } = useUnavailableTimeCancel({
		reset,
		setShowForm,
		setIsEditing,
	});

	useEffect(() => {
		fetchUnavaliableTime();
	}, [fetchUnavaliableTime]);

	const handleNewClick = useCallback(() => {
		setSelectedUnavailableTime(null);
		setShowForm(true);
	}, []);

	const handleEditClick = useCallback(
		(unavailableTimeId: number) => {
			handleEditUnavailableTime(unavailableTimeId);
		},
		[handleEditUnavailableTime]
	);

	const handleDeleteClick = useCallback(
		(unavailableTimeId: number) => {
			handleUnavaliableTimeOpenModal(unavailableTimeId);
		},
		[handleUnavaliableTimeOpenModal]
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
				<SectionHeader title="Horários indisponíveis" />

				{showForm ? (
					<UnavailableTimeForm
						onSubmit={handleSubmitUnavailableTime}
						onEdit={() =>
							handleEditUnavailableTime(Number(selectedUnavailableTime))
						}
						onCancel={handleCancel}
						isEditing={isEditing}
						selectedUnavailableTime={selectedUnavailableTime}
					/>
				) : unavaliables.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Nova indisponibilidade"
							onNewClick={handleNewClick}
						/>
						<TableUnavaliable
							unavaliables={unavaliables}
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
							buttonText="Nova indisponibilidade"
							onNewClick={handleNewClick}
						/>
						<EmptyState />
					</>
				)}
				{selectedUnavailableTime && (
					<ModalDelete
						isOpen={isOpen}
						onClose={onClose}
						title="horário disponível"
						itemName={new Date(selectedUnavailableTime.date).toLocaleDateString(
							"pt-BR"
						)}
						onDelete={handleDeleteUnavailableTime}
					/>
				)}
			</Flex>
		</Container>
	);
}
