import { Flex, Box, useDisclosure, Container, Spinner } from "@chakra-ui/react";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import DynamicTable, {
	ColumnConfig,
} from "../../../../shared/components/DynamicTable";
import {
	getServicesById,
	deleteService,
} from "@/features/services/services/api";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useHandleError } from "@/shared/hooks/useHandleError";
import { usePagination } from "@/shared/hooks/usePagination";
import { useShowForm } from "@/shared/hooks/useShowForm";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUnavailableTimes } from "../../services/api";
import SectionHeader from "@/shared/components/SectionHeader";
import RegisterButton from "@/shared/components/RegisterButton";
import EmptyState from "@/shared/components/EmptyState";
import ModalDelete from "@/shared/components/Modal";

export default function TableUnavaliable() {
	const { currentPage } = usePagination();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { closeForm } = useShowForm();
	const [selectedUnavailableTime, setSelectedUnavailableTime] =
		useState<FormDataUnavailableTime | null>(null);
	const { showToast } = useCustomToast();
	const handleError = useHandleError();
	const queryClient = useQueryClient();

	const {
		data: unavaliableTimes,
		isLoading,
		isRefetching,
	} = useQuery({
		queryKey: ["unavailable-time", currentPage],
		queryFn: () => getUnavailableTimes(currentPage),
	});

	const handleNewClick = useCallback(() => {
		navigate("/unavaliable-time/new");
	}, [navigate]);

	const onEditClick = useCallback(
		(unavailableTimeId: number) => {
			navigate(`/unavaliable-time/${unavailableTimeId}`);
		},
		[navigate],
	);

	const onDeleteClick = useCallback(
		async (unavailableTimeId: number) => {
			try {
				const unavailableTimeData = await getServicesById(unavailableTimeId);
				setSelectedUnavailableTime(unavailableTimeData);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do serviço", error);
			}
		},
		[onOpen, setSelectedUnavailableTime],
	);

	const mutation = useMutation({
		mutationFn: (unavailableTimeId: number) => deleteService(unavailableTimeId),
		onSuccess: () => {
			showToast({
				title: "Horário indisponível excluído com sucesso.",
				status: "success",
			});
			closeForm();
			setSelectedUnavailableTime(null);
			queryClient.invalidateQueries({ queryKey: ["unavailable-time"] });
		},
		onError: (error: unknown) => {
			onClose();
			handleError(error);
		},
	});

	const handleDeleteUnavailableTime = () => {
		if (!selectedUnavailableTime || !selectedUnavailableTime.id) {
			showToast({
				title: "Horário indisponível não encontrado.",
				status: "error",
			});
			return;
		}
		mutation.mutate(selectedUnavailableTime.id);
	};

	const columnsUnavailableTime: ColumnConfig<FormDataUnavailableTime>[] = [
		{
			key: "date",
			label: "Data",
			hideOnMobile: false,
		},
		{
			key: "startTime",
			label: "Horário ínicio",
			hideOnMobile: true,
		},
		{
			key: "endTime",
			label: "Horário fim",
			hideOnMobile: true,
		},
	];

	const openModal = !!selectedUnavailableTime;

	return (
		<Container>
			<Flex
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<SectionHeader title="Horários Indisponíveis" />
				{isLoading || isRefetching ? (
					<Spinner />
				) : unavaliableTimes?.unavaliableTimes?.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Novo horário indisponível"
							onNewClick={handleNewClick}
						/>
						<DynamicTable
							columns={columnsUnavailableTime}
							data={unavaliableTimes?.unavaliableTimes?.map(
								(unavailable: FormDataUnavailableTime) => ({
									...unavailable,
									date: new Date(unavailable.date).toLocaleDateString("pt-BR"),
								}),
							)}
							actions={(row) => (
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
					</>
				) : (
					<>
						<RegisterButton
							buttonText="Novo horário disponível"
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
					title="horário indisponível"
					itemName={selectedUnavailableTime?.date ?? ""}
					description="Tem certeza que deseja excluir o horário indisponível do dia "
					onDelete={handleDeleteUnavailableTime}
				/>
			)}
		</Container>
	);
}
