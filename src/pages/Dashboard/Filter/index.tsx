import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Grid,
	Select,
} from "@chakra-ui/react";
import { monthsOfYear } from "../../../utils/monthsOfYear";
import { FaFilter } from "react-icons/fa";
import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister,
} from "react-hook-form";
import { FormDataDashboard } from "../../../interface/FormDataDashboard";

interface FilterDashBoardProps {
	register: UseFormRegister<FormDataDashboard>;
	handleSubmit: UseFormHandleSubmit<FormDataDashboard>;
	handleSubmitPieChart: (data: FormDataDashboard) => Promise<void>;
	errors: FieldErrors<FormDataDashboard>;
}

export default function FilterDashBoard({
	register,
	handleSubmit,
	handleSubmitPieChart,
	errors,
}: FilterDashBoardProps) {
	console.log("Errors:", errors);
	return (
		<Flex
			gap="0.625rem"
			justify="center"
			padding="0.625rem"
			as="form"
			onSubmit={handleSubmit(handleSubmitPieChart)}>
			<FormControl isInvalid={!!errors.month}>
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
				{errors.month && (
					<FormErrorMessage>{errors.month.message}</FormErrorMessage>
				)}
			</FormControl>

			<FormControl isInvalid={!!errors.year}>
				<Select
					id="year"
					placeholder="Selecione o ano"
					{...register("year")}>
					<option value="2024">2024</option>
					<option value="2025">2025</option>
				</Select>
				{errors.year && (
					<FormErrorMessage>{errors.year.message}</FormErrorMessage>
				)}
			</FormControl>

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
