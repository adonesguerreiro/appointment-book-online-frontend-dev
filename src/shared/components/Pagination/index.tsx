import { usePagination } from "@/shared/hooks/usePagination";
import { Flex, Button, Text } from "@chakra-ui/react";

interface PaginationProps {
	totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
	const { currentPage, setPage } = usePagination();

	return (
		<Flex
			justifyContent="center"
			alignItems="center"
			gap={2}>
			<Button
				fontSize={{ base: "0.875rem", md: "1rem" }}
				onClick={() => setPage(currentPage - 1)}
				isDisabled={currentPage === 1}
				colorScheme="orange">
				Anterior
			</Button>
			<Text fontSize={{ base: "0.875rem", md: "1rem" }}>
				Página {currentPage} de {totalPages}
			</Text>
			<Button
				fontSize={{ base: "0.875rem", md: "1rem" }}
				onClick={() => setPage(currentPage + 1)}
				isDisabled={currentPage === totalPages}
				colorScheme="orange">
				Próximo
			</Button>
		</Flex>
	);
}
