import { Box, Button, FormControl, SimpleGrid } from "@chakra-ui/react";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { BookingAppointmentData } from "../../pages/BookAppointment";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useEffect } from "react";

interface TimeListProps {
	setValue: UseFormSetValue<BookingAppointmentData>;
	errors: FieldErrors<BookingAppointmentData>;
}

export default function TimeList({ setValue, errors }: TimeListProps) {
	const availableTimes = [
		{ time: "09:00", available: true },
		{ time: "10:00", available: false },
		{ time: "11:00", available: true },
		{ time: "14:00", available: true },
		{ time: "15:00", available: false },
	];

	const { showToast } = useCustomToast();

	useEffect(() => {
		if (errors.time) {
			showToast({
				title: "Por favor, selecione um horário disponível.",
				status: "warning",
				duration: 1000,
			});
		}
	}, [errors.time, showToast]);

	console.log("Erros:", errors);
	return (
		<Box padding="0.625rem">
			<FormControl isInvalid={!!errors.time}>
				<SimpleGrid
					columns={3}
					spacing={3}
					padding={3}
					justifyItems="center">
					{availableTimes.map((time, index) => (
						<Button
							key={index}
							width="6rem"
							bg={time.available ? "green.500" : "gray.300"}
							color={time.available ? "white" : "black"}
							_hover={time.available ? { bg: "green.600" } : {}}
							onClick={() => {
								setValue("time", time.time);
							}}
							_focus={{ bg: "blue.500" }}
							isDisabled={!time.available}
							id="time">
							{time.time}
						</Button>
					))}
				</SimpleGrid>
			</FormControl>
		</Box>
	);
}
