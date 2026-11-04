import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<VStack
			spacing={4}
			align="center"
			justify="center"
			height="100vh"
			px={6}
			textAlign="center">
			<Heading
				fontSize="6xl"
				color="teal.600">
				404
			</Heading>
			<Text
				fontSize="xl"
				color="gray.600">
				Página não encontrada
			</Text>
			<Text
				fontSize="md"
				color="gray.500">
				O endereço acessado não existe ou foi movido.
			</Text>
			<Button
				colorScheme="teal"
				leftIcon={<FaArrowLeft />}
				onClick={() => navigate("/")}
				mt={4}>
				Voltar para o início
			</Button>
		</VStack>
	);
}
