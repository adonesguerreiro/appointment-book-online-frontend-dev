import { Flex, Button, Text } from "@chakra-ui/react";

interface PaginationProps {
	handlePrev: () => void;
	handleNext: () => void;
	currentPage: number;
	totalPages: number;
}

export default function Pagination({
	handlePrev,
	handleNext,
	currentPage,
	totalPages,
}: PaginationProps) {
	return (
		<Flex
			justifyContent="center"
			alignItems="center"
			gap={2}>
			<Button
				fontSize={{ base: "0.875rem", md: "1rem" }}
				onClick={handlePrev}
				isDisabled={currentPage === 1}
				colorScheme="orange">
				Anterior
			</Button>
			<Text fontSize={{ base: "0.875rem", md: "1rem" }}>
				Página {currentPage} de {totalPages}
			</Text>
			<Button
				fontSize={{ base: "0.875rem", md: "1rem" }}
				onClick={handleNext}
				isDisabled={currentPage === totalPages}
				colorScheme="orange">
				Próximo
			</Button>
		</Flex>
	);
}
