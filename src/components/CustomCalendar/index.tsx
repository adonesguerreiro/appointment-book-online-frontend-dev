import { Flex, FormControl, Input } from "@chakra-ui/react";
import Calendar from "react-calendar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { BookingAppointmentData } from "../../pages/BookAppointment";
import {
	FieldErrors,
	UseFormClearErrors,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";
import { useEffect, useState } from "react";
import { useCustomToast } from "../../hooks/useCustomToast";

interface CustomCalendarProps {
	register: UseFormRegister<BookingAppointmentData>;
	errors: FieldErrors<BookingAppointmentData>;
	setValue: UseFormSetValue<BookingAppointmentData>;
	clearErrors: UseFormClearErrors<BookingAppointmentData>;
}
export default function CustomCalendar({
	register,
	errors,
	setValue,
	clearErrors,
}: CustomCalendarProps) {
	const currentYear = new Date().getFullYear();
	const { showToast } = useCustomToast();
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	useEffect(() => {
		if (errors.calendar) {
			showToast({
				title: "Por favor, selecione uma data disponível.",
				status: "warning",
				duration: 1000,
			});
			clearErrors("calendar");
		}
	}, [clearErrors, errors.calendar, showToast]);

	return (
		<Flex
			borderRadius="lg"
			boxShadow="md"
			bg="white"
			p={4}
			maxW="fit-content"
			mx="auto"
			sx={{
				".react-calendar": {
					border: "none",
					fontFamily: "inherit",
				},
				".react-calendar__tile--active": {
					bg: "teal",
					color: "white",
				},

				".react-calendar__tile:hover": {
					bg: "gray.200",
				},
				".react=calendar__tile--now": {
					bg: "gray.200",
				},
				".react-calendar__navigation button": {
					color: "teal",
					fontWeight: "bold",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				},
			}}>
			<FormControl isInvalid={!!errors.calendar}>
				<Calendar
					locale="pt-BR"
					minDate={new Date()}
					maxDate={new Date(currentYear, 11, 31)}
					onChange={(date) => {
						setValue("calendar", date as Date, { shouldValidate: true });
						setSelectedDate(date as Date);
					}}
					value={selectedDate}
					className="react-calendar"
					prevLabel={<FaChevronLeft />}
					nextLabel={<FaChevronRight />}
					prev2Label={null}
					next2Label={null}
				/>
				<Input
					type="hidden"
					{...register("calendar")}
				/>
			</FormControl>
		</Flex>
	);
}
