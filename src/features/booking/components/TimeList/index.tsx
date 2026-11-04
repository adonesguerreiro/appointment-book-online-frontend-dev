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
import { BookingAppointmentData } from "../../interface/BookingAppointmentData";
import { useCustomToast } from "../../../../shared/hooks/useCustomToast";
import { useEffect, useState } from "react";
import { AvaliableTimeSlot } from "../../../schedule/interface/AvailableTimeSlot";

interface TimeListProps {
	register: UseFormRegister<BookingAppointmentData>;
	setValue: UseFormSetValue<BookingAppointmentData>;
	errors: FieldErrors<BookingAppointmentData>;
	clearErrors: UseFormClearErrors<BookingAppointmentData>;
	avaliableTimeSlot: AvaliableTimeSlot;
	isSubmitting: boolean;
}

export default function TimeList({
	register,
	setValue,
	errors,
	clearErrors,
	avaliableTimeSlot,
	isSubmitting,
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
		if (isSubmitting) {
			const timer = setTimeout(() => {
				setSelectedTime("");
			}, 0);
			return () => clearTimeout(timer);
		}
	}, [clearErrors, errors.time, isSubmitting, showToast]);

	return (
		<Box padding="0.625rem">
			<FormControl isInvalid={!!errors.time}>
				<SimpleGrid
					placeItems="center"
					columns={3}
					spacing={3}
					padding={3}>
					{avaliableTimeSlot?.slots?.length > 0 ? (
						avaliableTimeSlot.slots.map((time) => (
							<Button
								key={time}
								width="6rem"
								bg={selectedTime === time ? "blue.500" : "green.500"}
								color="white"
								_hover={{ bg: "green.600" }}
								onClick={() => {
									setValue("time", time);
									setSelectedTime(time);
								}}
								value={selectedTime}
								id="time"
								{...register("time")}>
								{time}
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
