import { Box, Container, Flex } from "@chakra-ui/react";
import { usePieChart } from "../../hooks/Dashboard/usePieChart";
import PieChartDashboard from "./PieChart";
import SectionHeader from "../../components/SectionHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import { dashboardSchema } from "../../validators/dashboardSchema";
import { FormDataDashboard } from "../../interface/FormDataDashboard";
import { useForm } from "react-hook-form";
import EmptyState from "../../components/EmptyState";
import FilterDashBoard from "./Filter";
import { usePieCharSubmit } from "../../hooks/Dashboard/usePieChartSubmit";

export default function DashboardPage() {
	const { register, handleSubmit } = useForm<FormDataDashboard>({
		resolver: yupResolver(dashboardSchema),
	});

	const { fetchDataPieChart, chartData } = usePieChart();
	const { handleSubmitPieChart } = usePieCharSubmit({ fetchDataPieChart });

	return (
		<Container width="auto">
			<Flex
				direction="column"
				align="center"
				justify="center"
				borderRadius="md"
				minHeight="60vh">
				<SectionHeader title="Dashboard" />
				<Flex
					direction="column"
					align="center"
					justify="center"
					borderRadius="md"
					minHeight="60vh">
					<FilterDashBoard
						register={register}
						handleSubmit={handleSubmit}
						handleSubmitPieChart={handleSubmitPieChart}
					/>
					<Box
						mb={4}
						background={"gray.100"}>
						{chartData.length > 0 ? (
							<PieChartDashboard chartData={chartData} />
						) : (
							<EmptyState />
						)}
					</Box>
				</Flex>
			</Flex>
		</Container>
	);
}
