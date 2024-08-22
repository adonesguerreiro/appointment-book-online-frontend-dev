import {
	Card,
	CardHeader,
	Heading,
	CardBody,
	Box,
	Text,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Button,
	FormErrorMessage,
	useToast,
	Container,
} from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
import { useForm } from "react-hook-form";
import { FormDataLogin } from "../../interface/FormDataLogin";
import { loginSchema } from "./loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function LoginPage() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormDataLogin>({
		resolver: yupResolver(loginSchema),
	});

	const toast = useToast();

	const onSubmit = () => {
		toast({
			title: "Autenticado com sucesso!",
			status: "success",
			duration: 3000,
			isClosable: true,
			position: "top-right",
		});
	};

	return (
		<Container>
			<Flex
				direction="column"
				align="center"
				justify="center"
				height="100vh">
				<Card>
					<CardHeader
						display="grid"
						gap="0.625rem"
						fontFamily="Roboto, sans-serif">
						<Heading
							as="h1"
							size="lg"
							fontWeight="semibold">
							Seja bem vindo de volta
						</Heading>
						<Box>
							<Text
								as="h2"
								fontSize="lg">
								Por favor, entre com suas credenciais
							</Text>
						</Box>
					</CardHeader>

					<CardBody
						width="52.5625rem"
						height="40.6875rem">
						<Box
							display="grid"
							placeItems="center">
							<form onSubmit={handleSubmit(onSubmit)}>
								<FormControl
									display="grid"
									alignItems="center"
									width="25.0625rem"
									padding="0.625rem"
									gap="0.625rem"
									isInvalid={!!errors}>
									<FormLabel>Email</FormLabel>
									<Input
										type="email"
										placeholder="Insira seu email"
										id="email"
										{...register("email")}
										isInvalid={!!errors.email}
									/>
									{errors.email && (
										<FormErrorMessage>{errors.email.message}</FormErrorMessage>
									)}

									<FormLabel>Senha</FormLabel>
									<Input
										type="password"
										placeholder="Insira sua senha"
										id="password"
										isInvalid={!!errors.password}
										{...register("password")}
									/>
									{errors.password && (
										<FormErrorMessage>
											{errors.password.message}
										</FormErrorMessage>
									)}
								</FormControl>
								<Button
									colorScheme="teal"
									size="lg"
									rightIcon={<MdArrowForward />}
									type="submit">
									Entrar
								</Button>
							</form>
						</Box>
					</CardBody>
				</Card>
			</Flex>
		</Container>
	);
}
