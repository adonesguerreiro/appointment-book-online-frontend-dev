import { Flex, Box, useDisclosure, Container, Spinner } from "@chakra-ui/react";
import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import DynamicTable, {
	ColumnConfig,
} from "../../../../shared/components/DynamicTable";
import { usePagination } from "@/shared/hooks/usePagination";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useHandleError } from "@/shared/hooks/useHandleError";
import { useShowForm } from "@/shared/hooks/useShowForm";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
	deleteAvaliableTime,
	getAvaliableTimeById,
	getAvaliableTimes,
} from "../../services/api";
import ModalDelete from "@/shared/components/Modal";
import RegisterButton from "@/shared/components/RegisterButton";
import Pagination from "@/shared/components/Pagination";
import EmptyState from "@/shared/components/EmptyState";
import SectionHeader from "@/shared/components/SectionHeader";

export default function TableAvaliable() {
	const { currentPage } = usePagination();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { closeForm } = useShowForm();
	const [selectedAvaliableTime, setSelectedAvaliableTime] =
		useState<FormDataAvailableTime | null>(null);
	const { showToast } = useCustomToast();
	const handleError = useHandleError();
	const queryClient = useQueryClient();

	const {
		data: avaliableTimes,
		isLoading,
		isRefetching,
	} = useQuery({
		queryKey: ["avaliable-time", currentPage],
		queryFn: () => getAvaliableTimes(currentPage),
	});

	const handleNewClick = useCallback(() => {
		navigate("/avaliable-time/new");
	}, [navigate]);

	const onEditClick = useCallback(
		(avaliableTimeId: number) => {
			navigate(`/avaliable-time/${avaliableTimeId}`);
		},
		[navigate],
	);

	const onDeleteClick = useCallback(
		async (avaliableTimeId: number) => {
			try {
				const avaliableTimeData = await getAvaliableTimeById(avaliableTimeId);
				setSelectedAvaliableTime(avaliableTimeData);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do horário disponível:", error);
			}
		},
		[onOpen, setSelectedAvaliableTime],
	);

	const mutation = useMutation({
		mutationFn: (avaliableTimeId: number) =>
			deleteAvaliableTime(avaliableTimeId),
		onSuccess: () => {
			showToast({
				title: "Horário disponível excluído com sucesso.",
				status: "success",
			});
			closeForm();
			setSelectedAvaliableTime(null);
			queryClient.invalidateQueries({
				queryKey: ["avaliable-time", currentPage],
			});
		},
		onError: (error: unknown) => {
			onClose();
			handleError(error);
		},
	});

	const handleDeleteAvaliableTime = () => {
		if (!selectedAvaliableTime || !selectedAvaliableTime.id) {
			showToast({
				title: "Serviço não encontrado.",
				status: "error",
			});
			return;
		}
		mutation.mutate(selectedAvaliableTime.id);
	};

	const columnsAvaliableTime: ColumnConfig<FormDataAvailableTime>[] = [
		{
			key: "day",
			label: "Dia",
			hideOnMobile: false,
		},
		{
			key: "period",
			label: "Período",
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
		{
			key: "interval",
			label: "Intervalo",
			hideOnMobile: true,
		},
	];

	const openModal = !!selectedAvaliableTime;

	const periodMapping: { [key: string]: string } = {
		MORNING: "Manhã",
		AFTERNOON: "Tarde",
		EVENING: "Noite",
	};

	const dayMapping: { [key: string]: string } = {
		MONDAY: "Segunda-feira",
		TUESDAY: "Terça-feira",
		WEDNESDAY: "Quarta-feira",
		THURSDAY: "Quinta-feira",
		FRIDAY: "Sexta-feira",
		SATURDAY: "Sábado",
		SUNDAY: "Domingo",
	};

	const avaliableTimesData =
		avaliableTimes?.avaliableTimes?.map(
			(avaliableTime: FormDataAvailableTime) => ({
				...avaliableTime,
				day: dayMapping[avaliableTime.day],
				period: periodMapping[avaliableTime.period],
			}),
		) || [];

	return (
		<Container>
			<Flex
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<SectionHeader title="Horários Disponíveis" />
				{isLoading || isRefetching ? (
					<Spinner />
				) : avaliableTimes?.avaliableTimes?.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Novo horário disponível"
							onNewClick={handleNewClick}
						/>
						<DynamicTable
							columns={columnsAvaliableTime}
							data={avaliableTimesData ?? []}
							actions={(row: FormDataAvailableTime) => (
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
						<Pagination totalPages={avaliableTimes?.totalPages} />
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
					title="horário disponível"
					itemName={selectedAvaliableTime.day ?? ""}
					description="Tem certeza que deseja excluir o horário disponível "
					onDelete={handleDeleteAvaliableTime}
				/>
			)}
		</Container>
	);
}
