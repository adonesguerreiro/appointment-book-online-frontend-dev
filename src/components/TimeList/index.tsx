import { Box, Button, FormControl, SimpleGrid } from "@chakra-ui/react";
import {
	FieldErrors,
	UseFormClearErrors,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";
import { BookingAppointmentData } from "../../pages/BookAppointment";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useEffect, useState } from "react";

interface TimeListProps {
	register: UseFormRegister<BookingAppointmentData>;
	setValue: UseFormSetValue<BookingAppointmentData>;
	errors: FieldErrors<BookingAppointmentData>;
	clearErrors: UseFormClearErrors<BookingAppointmentData>;
}

export default function TimeList({
	register,
	setValue,
	errors,
	clearErrors,
}: TimeListProps) {
	const availableTimes = [
		{ time: "09:00", available: true },
		{ time: "10:00", available: false },
		{ time: "11:00", available: true },
		{ time: "14:00", available: true },
		{ time: "15:00", available: false },
	];

	const { showToast } = useCustomToast();
	const [selectedTime, setSelectedTime] = useState<string>();

	useEffect(() => {
		if (errors.time) {
			showToast({
				title: "Por favor, selecione um horário disponível.",
				status: "warning",
				duration: 1000,
			});
			clearErrors("time");
		}
	}, [clearErrors, errors.time, showToast]);

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
							bg={
								selectedTime === time.time
									? "blue.500"
									: time.available
									? "green.500"
									: "gray.300"
							}
							color={time.available ? "white" : "black"}
							_hover={time.available ? { bg: "green.600" } : {}}
							onClick={() => {
								setValue("time", time.time);
								setSelectedTime(time.time);
							}}
							value={selectedTime}
							isDisabled={!time.available}
							id="time"
							{...register("time")}>
							{time.time}
						</Button>
					))}
				</SimpleGrid>
			</FormControl>
		</Box>
	);
}
