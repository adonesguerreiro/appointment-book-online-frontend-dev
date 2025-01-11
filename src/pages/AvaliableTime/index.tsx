import { Container, Flex, Spinner } from "@chakra-ui/react";
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

export default function AvaliableTimePage() {
	const { reset } = useForm<FormDataAvailableTime>({
		resolver: yupResolver(availableTimeSchema),
	});

	const { currentPage, handlePrev, handleNext } = usePagination();
	const [showForm, setShowForm] = useState(false);
	const [selectedAvailableTime, setSelectAvailableTime] =
		useState<FormDataAvailableTime | null>();
	const [isEditing, setIsEditing] = useState(false);

	const { availableTime, totalPages, loading, fetchAvaliableTime } =
		useAvaliableTime(currentPage);

	const { handleSubmitAvaliableTime } = useAvaliableTimeSubmit({
		selectedAvailableTime,
		fetchAvaliableTime,
		setShowForm,
	});

	const { handleEditAvaliableTime } = useAvaliableTimeEdit({
		setShowForm,
		setIsEditing,
		setSelectAvailableTime,
	});

	const { handleCancel } = useAvaliableTimeCancel({
		reset,
		setShowForm,
		setIsEditing,
	});

	useEffect(() => {
		fetchAvaliableTime();
	}, [fetchAvaliableTime]);

	const handleNewClick = useCallback(() => {
		setSelectAvailableTime(null);
		setShowForm(true);
	}, []);

	const handleEditClick = useCallback(
		(avaliableTimeId: number) => {
			handleEditAvaliableTime(avaliableTimeId);
		},
		[handleEditAvaliableTime]
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
							handleEditAvaliableTime(Number(selectedAvailableTime))
						}
						onCancel={handleCancel}
						isEditing={isEditing}
						selectedAvailableTime={selectedAvailableTime}
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
			</Flex>
		</Container>
	);
}
