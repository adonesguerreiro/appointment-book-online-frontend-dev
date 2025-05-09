import {
	Box,
	Button,
	Flex,
	FormControl,
	GridItem,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import {
	FieldErrors,
	UseFormClearErrors,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";
import { BookingAppointmentData } from "../../pages/BookAppointment";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useEffect, useState } from "react";
import { AvaliableTimeSlot } from "../../interface/AvailableTimeSlot";

interface TimeListProps {
	register: UseFormRegister<BookingAppointmentData>;
	setValue: UseFormSetValue<BookingAppointmentData>;
	errors: FieldErrors<BookingAppointmentData>;
	clearErrors: UseFormClearErrors<BookingAppointmentData>;
	avaliableTimeSlot: AvaliableTimeSlot[];
}

export default function TimeList({
	register,
	setValue,
	errors,
	clearErrors,
	avaliableTimeSlot,
}: TimeListProps) {
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

	return (
		<Box padding="0.625rem">
			<FormControl isInvalid={!!errors.time}>
				<SimpleGrid
					placeItems="center"
					columns={3}
					spacing={3}
					padding={3}>
					{avaliableTimeSlot.length > 0 ? (
						avaliableTimeSlot.map((avaliableTimeSlot, index) => (
							<Button
								key={index}
								width="6rem"
								bg={
									selectedTime === avaliableTimeSlot.timeSlot
										? "blue.500"
										: avaliableTimeSlot.timeSlot
										? "green.500"
										: "gray.300"
								}
								color={avaliableTimeSlot.timeSlot ? "white" : "black"}
								_hover={avaliableTimeSlot.timeSlot ? { bg: "green.600" } : {}}
								onClick={() => {
									setValue("time", avaliableTimeSlot.timeSlot);
									setSelectedTime(avaliableTimeSlot.timeSlot);
								}}
								value={selectedTime}
								isDisabled={!avaliableTimeSlot.timeSlot}
								id="time"
								{...register("time")}>
								{avaliableTimeSlot.timeSlot}
							</Button>
						))
					) : (
						<GridItem colSpan={3}>
							<Flex justifyContent="center">
								<Text>Não há horário para data selecionada.</Text>
							</Flex>
						</GridItem>
					)}
				</SimpleGrid>
			</FormControl>
		</Box>
	);
}
