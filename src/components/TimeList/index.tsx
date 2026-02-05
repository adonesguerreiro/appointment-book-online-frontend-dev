import {
	Box,
	Button,
	Field,
	Flex,
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
import { useState } from "react";
import { AvaliableTimeSlot } from "../../interface/AvailableTimeSlot";

interface TimeListProps {
	register: UseFormRegister<BookingAppointmentData>;
	setValue: UseFormSetValue<BookingAppointmentData>;
	errors: FieldErrors<BookingAppointmentData>;
	clearErrors: UseFormClearErrors<BookingAppointmentData>;
	avaliableTimeSlot: AvaliableTimeSlot[];
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

	const [selectedTime, setSelectedTime] = useState<string>("");

	const timeSelected = (item: string) => {
		if (!item) {
			showToast({
				title: "Por favor, selecione um horário disponível.",
				type: "warning",
				duration: 1000,
			});

			clearErrors("time");
		}

		if (isSubmitting) {
			setSelectedTime("");
		}
	};

	return (
		<Box padding="0.625rem">
			<Field.Root invalid={!!errors.time}>
				<SimpleGrid
					column={[3, 3, 3]}
					placeItems="center">
					{avaliableTimeSlot.length > 0 ? (
						avaliableTimeSlot.map((avaliableTimeSlot, index) => (
							<Button
								key={index}
								width="6rem"
								bg={
									selectedTime === avaliableTimeSlot.timeSlot
										? "blue.500"
										: "green.500"
								}
								color={avaliableTimeSlot.timeSlot ? "white" : "black"}
								_hover={avaliableTimeSlot.timeSlot ? { bg: "green.600" } : {}}
								onClick={() => {
									setValue("time", avaliableTimeSlot.timeSlot);
									setSelectedTime(avaliableTimeSlot.timeSlot);
									timeSelected(avaliableTimeSlot.timeSlot);
								}}
								value={selectedTime}
								disabled={!avaliableTimeSlot.timeSlot}
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
			</Field.Root>
		</Box>
	);
}
