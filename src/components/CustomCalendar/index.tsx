import { Flex } from "@chakra-ui/react";
import Calendar from "react-calendar";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export default function CustomCalendar() {
	const currentYear = new Date().getFullYear();
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
				},
			}}>
			<Calendar
				locale="pt-BR"
				minDate={new Date()}
				maxDate={new Date(currentYear, 11, 31)}
				onChange={(date) => console.log(date)}
				value={new Date()}
				className="react-calendar"
				prevLabel={<ChevronLeftIcon />}
				nextLabel={<ChevronRightIcon />}
				prev2Label={null}
				next2Label={null}
			/>
		</Flex>
	);
}
