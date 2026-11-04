import { VStack, Text, Image } from "@chakra-ui/react";

export default function EmptyState() {
	return (
		<VStack
			spacing={4}
			align="center"
			justify="center"
			width={{ base: "100%", sm: "25rem" }}
			maxW="25rem"
			minH="18.75rem"
			bg="gray.50"
			borderRadius="md"
			borderWidth="1px"
			borderColor="gray.200"
			p={6}
			mx="auto"
			my={{ base: "1.5rem", sm: "3.25rem" }}>
			<Image
				src="/nodata.svg"
				alt="No data"
				width={{ base: "7rem", sm: "10rem" }}
			/>
			<Text
				fontSize="lg"
				color="gray.600">
				Sem dados
			</Text>
		</VStack>
	);
}
