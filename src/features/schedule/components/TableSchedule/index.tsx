import { Box, Container, Flex, Grid, Link, Spinner } from "@chakra-ui/react";
import { FormDataSchedule } from "../../../schedule/interface/FormDataSchedule";
import { formatDate } from "../../../../utils/formatDate";
import { statusMapping } from "../../../../utils/statusMapping";
import { TbEdit } from "react-icons/tb";
import DynamicTable, {
	ColumnConfig,
} from "../../../../shared/components/DynamicTable";
import { usePagination } from "@/shared/hooks/usePagination";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "@/shared/components/SectionHeader";
import { getSchedules } from "../../services/api";
import RegisterButton from "@/shared/components/RegisterButton";
import Pagination from "@/shared/components/Pagination";
import EmptyState from "@/shared/components/EmptyState";
import { getUserById } from "@/features/users/services/api";
import { LiaExternalLinkAltSolid } from "react-icons/lia";

export default function TableSchedule() {
	const { currentPage } = usePagination();
	const navigate = useNavigate();

	const {
		data: schedules,
		isLoading,
		isRefetching,
	} = useQuery({
		queryKey: ["schedule", currentPage],
		queryFn: () => getSchedules(currentPage),
	});

	const handleNewClick = useCallback(() => {
		navigate("/schedule/new");
	}, [navigate]);

	const onEditClick = useCallback(
		(scheduleId: number) => {
			navigate(`/schedule/${scheduleId}`);
		},
		[navigate],
	);

	const columnsSchedule: ColumnConfig<FormDataSchedule>[] = [
		{
			key: "customerName",
			label: "Cliente",
			hideOnMobile: false,
		},
		{
			key: "serviceName",
			label: "Serviço",
			hideOnMobile: true,
		},
		{
			key: "date",
			label: "Data",
			render: (value) => formatDate(value as string),
			hideOnMobile: false,
		},
		{
			key: "status",
			label: "Status",
			render: (value) => statusMapping[value as string],
			hideOnMobile: true,
		},
	];

	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: getUserById,
	});

	return (
		<Container>
			<Flex
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<SectionHeader title="Agenda" />
				<Grid
					templateColumns="1fr auto"
					alignItems="center"
					justifyContent="space-between"
					padding="0.625rem"
					width="100%">
					<Link
						href={`/${user?.company.slugCompany}`}
						isExternal
						display="flex"
						alignItems="center"
						gap="2"
						color="teal.500">
						Minha agenda <LiaExternalLinkAltSolid />
					</Link>
					<RegisterButton
						buttonText="Novo agendamento"
						onNewClick={handleNewClick}
					/>
				</Grid>
				{isLoading || isRefetching ? (
					<Spinner />
				) : schedules?.schedules?.length > 0 ? (
					<>
						<DynamicTable
							columns={columnsSchedule}
							data={schedules?.schedules ?? []}
							actions={(row) => (
								<Box
									as={TbEdit}
									onClick={() => onEditClick(row.id!)}
									_hover={{ color: "blue", cursor: "pointer" }}
									fontSize="1.5rem"
								/>
							)}
						/>
						<Pagination totalPages={schedules?.totalPages} />
					</>
				) : (
					<>
						<EmptyState />
					</>
				)}
			</Flex>
		</Container>
	);
}
