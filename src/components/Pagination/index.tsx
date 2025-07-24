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
			direction="row"
			width="full"
			mt={4}
			gap={2}>
			<Button
				onClick={handlePrev}
				isDisabled={currentPage === 1}
				colorScheme="orange">
				Anterior
			</Button>
			<Text>
				Página {currentPage} de {totalPages}
			</Text>
			<Button
				onClick={handleNext}
				isDisabled={currentPage === totalPages}
				colorScheme="orange">
				Próximo
			</Button>
		</Flex>
	);
}
