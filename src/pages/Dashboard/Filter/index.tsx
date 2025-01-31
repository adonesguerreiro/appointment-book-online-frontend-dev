import { Box, Button, Flex, Grid, Select } from "@chakra-ui/react";
import { monthsOfYear } from "../../../utils/monthsOfYear";
import { FaFilter } from "react-icons/fa";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FormDataDashboard } from "../../../interface/FormDataDashboard";

interface FilterDashBoardProps {
	register: UseFormRegister<FormDataDashboard>;
	handleSubmit: UseFormHandleSubmit<FormDataDashboard>;
	handleSubmitPieChart: (data: FormDataDashboard) => Promise<void>;
}

export default function FilterDashBoard({
	register,
	handleSubmit,
	handleSubmitPieChart,
}: FilterDashBoardProps) {
	return (
		<Flex
			gap="0.625rem"
			justify="center"
			padding="0.625rem"
			as="form"
			onSubmit={handleSubmit(handleSubmitPieChart)}>
			<Select
				id="month"
				placeholder="Selecione o mês"
				{...register("month")}>
				{monthsOfYear.map((month) => (
					<option
						key={month.value}
						value={month.value}>
						{month.label}
					</option>
				))}
			</Select>
			<Select
				id="year"
				placeholder="Selecione o ano"
				{...register("year")}>
				<option value="2024">2024</option>
				<option value="2025">2025</option>
			</Select>
			<Grid>
				<Box>
					<Button
						colorScheme="teal"
						size="lg"
						type="submit"
						rightIcon={<FaFilter />}>
						Filtrar
					</Button>
				</Box>
			</Grid>
		</Flex>
	);
}
