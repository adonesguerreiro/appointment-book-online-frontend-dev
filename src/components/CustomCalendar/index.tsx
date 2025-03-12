import { Flex, FormControl, Input } from "@chakra-ui/react";
import Calendar from "react-calendar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { BookingAppointmentData } from "../../pages/BookAppointment";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useEffect } from "react";
import { useCustomToast } from "../../hooks/useCustomToast";

interface CustomCalendarProps {
	setValue: UseFormSetValue<BookingAppointmentData>;
	register: UseFormRegister<BookingAppointmentData>;
	errors: FieldErrors<BookingAppointmentData>;
}
export default function CustomCalendar({
	setValue,
	register,
	errors,
}: CustomCalendarProps) {
	const currentYear = new Date().getFullYear();
	const { showToast } = useCustomToast();

	useEffect(() => {
		if (errors.calendar) {
			showToast({
				title: "Por favor, selecione uma data disponível.",
				status: "warning",
				duration: 1000,
			});
		}
	}, [errors.calendar, showToast]);

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
						if (date instanceof Date) {
							setValue("calendar", date);
						}
					}}
					value={new Date()}
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
