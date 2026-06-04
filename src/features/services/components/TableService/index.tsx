import { Flex, Box, Container, Spinner, useDisclosure } from "@chakra-ui/react";
import { FormDataService } from "@/features/services/interface/FormDataService";
import { currencyFormat } from "../../../../utils/currencyFormat";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { formatMinutesInHours } from "../../../../utils/formatMinutesInHours";
import DynamicTable, {
	ColumnConfig,
} from "../../../../shared/components/DynamicTable";
import { useCallback, useState } from "react";
import {
	deleteService,
	getServices,
	getServicesById,
} from "../../services/api";
import { usePagination } from "@/shared/hooks/usePagination";
import { useNavigate } from "react-router-dom";
import Pagination from "@/shared/components/Pagination";
import RegisterButton from "@/shared/components/RegisterButton";
import EmptyState from "@/shared/components/EmptyState";
import SectionHeader from "@/shared/components/SectionHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ModalDelete from "@/shared/components/Modal";
import { useShowForm } from "@/shared/hooks/useShowForm";
import { useHandleError } from "@/shared/hooks/useHandleError";
import { useCustomToast } from "@/shared/hooks/useCustomToast";

export default function TableService() {
	const { currentPage } = usePagination();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { closeForm } = useShowForm();
	const [selectedService, setSelectedService] =
		useState<FormDataService | null>(null);
	const { showToast } = useCustomToast();
	const handleError = useHandleError();
	const queryClient = useQueryClient();

	const {
		data: services,
		isLoading,
		isRefetching,
	} = useQuery({
		queryKey: ["service", currentPage],
		queryFn: () => getServices(currentPage),
	});

	const handleNewClick = useCallback(() => {
		navigate("/service/new");
	}, [navigate]);

	const onEditClick = useCallback(
		(serviceId: number) => {
			navigate(`/service/${serviceId}`);
		},
		[navigate],
	);

	const onDeleteClick = useCallback(
		async (serviceId: number) => {
			try {
				const serviceData = await getServicesById(serviceId);
				setSelectedService(serviceData);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do serviço", error);
			}
		},
		[onOpen, setSelectedService],
	);

	const mutation = useMutation({
		mutationFn: (serviceId: number) => deleteService(serviceId),
		onSuccess: () => {
			showToast({
				title: "Serviço excluído com sucesso.",
				status: "success",
			});
			closeForm();
			setSelectedService(null);
			queryClient.invalidateQueries({ queryKey: ["services"] });
		},
		onError: (error: unknown) => {
			onClose();
			handleError(error);
		},
	});

	const handleDeleteService = () => {
		if (!selectedService || !selectedService.id) {
			showToast({
				title: "Serviço não encontrado.",
				status: "error",
			});
			return;
		}
		mutation.mutate(selectedService.id);
	};

	const columnsService: ColumnConfig<FormDataService>[] = [
		{
			key: "serviceName",
			label: "Nome",
			hideOnMobile: false,
		},
		{
			key: "duration",
			label: "Duração",
			hideOnMobile: true,
			render: (value) => formatMinutesInHours(value as number),
		},
		{
			key: "price",
			label: "Preço",
			hideOnMobile: true,
			render: (value) => currencyFormat(value as number),
		},
	];

	const openModal = !!selectedService;

	return (
		<Container>
			<Flex
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<SectionHeader title="Serviço" />
				{isLoading || isRefetching ? (
					<Spinner />
				) : services?.services.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Novo serviço"
							onNewClick={handleNewClick}
						/>
						<DynamicTable
							columns={columnsService}
							data={services?.services ?? []}
							actions={(row: FormDataService) => (
								<Flex>
									<Box _hover={{ color: "blue", cursor: "pointer" }}>
										<TbEdit
											onClick={() => {
												if (row.id) onEditClick(row.id);
											}}
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
						<Pagination totalPages={services?.totalPages} />
					</>
				) : (
					<>
						<RegisterButton
							buttonText="Novo serviço"
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
					title="serviço"
					itemName={selectedService?.serviceName ?? ""}
					description="Tem certeza que deseja excluir o serviço "
					onDelete={handleDeleteService}
				/>
			)}
		</Container>
	);
}
