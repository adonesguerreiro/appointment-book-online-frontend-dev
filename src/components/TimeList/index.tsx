import { Box, Button, SimpleGrid } from "@chakra-ui/react";

export default function TimeList() {
	const availableTimes = [
		{ time: "09:00", available: true },
		{ time: "10:00", available: false },
		{ time: "11:00", available: true },
		{ time: "14:00", available: true },
		{ time: "15:00", available: false },
	];
	return (
		<Box padding="0.625rem">
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
						color={"white"}
						_hover={time.available ? { bg: "green.600" } : {}}
						_selected={{ bg: "blue.500" }}
						isDisabled={!time.available}>
						{time.time}
					</Button>
				))}
			</SimpleGrid>
		</Box>
	);
}
