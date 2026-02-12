import {
	Box,
	Button,
	Flex,
	Field,
	Grid,
	NativeSelect,
} from "@chakra-ui/react";
import { monthsOfYear } from "../../../utils/monthsOfYear";
import { FaFilter } from "react-icons/fa";
import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister,
} from "react-hook-form";
import { FormDataDashboard } from "../../../interface/FormDataDashboard";
import { year } from "../../../utils/year";

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
        <Flex gap="0.625rem" justify="center" padding="0.625rem" asChild><form onSubmit={handleSubmit(handleSubmitPieChart)}>
                    <Field.Root invalid={!!errors.month}>
                        <NativeSelect.Root
                            id="month"
                            {...register("month")}>
                            <NativeSelect.Field placeholder="Selecione o mês">
                                {monthsOfYear.map((month) => (
                                    <option
                                        key={month.value}
                                        value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                        {errors.month && (
                            <Field.ErrorText>{errors.month.message}</Field.ErrorText>
                        )}
                    </Field.Root>
                    <Field.Root invalid={!!errors.year}>
                        <NativeSelect.Root
                            id="year"
                            {...register("year")}>
                            <NativeSelect.Field placeholder="Selecione o ano"></NativeSelect.Field>
                            {year.map((year) => (
                                <option
                                    key={year.value}
                                    value={year.value}>
                                    {year.label}
                                </option>
                            ))}
                        </NativeSelect.Root>
                        {errors.year && (
                            <Field.ErrorText>{errors.year.message}</Field.ErrorText>
                        )}
                    </Field.Root>
                    <Grid>
                        <Box>
                            <Button
                                colorPalette="teal"
                                size="lg"
                                type="submit">
                                <FaFilter />
                                Filtrar
                            </Button>
                        </Box>
                    </Grid>
                </form></Flex>
    );
}
