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
	Container,
	Spinner,
	Link,
} from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
import { useForm } from "react-hook-form";
import { FormDataLogin } from "../../interface/FormDataLogin";
import { loginSchema } from "../../validators/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../services/api";
import { useLoading } from "../../hooks/useLoading";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useHandleError } from "../../hooks/useHandleError";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const { loading, setLoading } = useLoading();
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormDataLogin>({
		resolver: yupResolver(loginSchema),
	});

	const { showToast } = useCustomToast();

	const handleError = useHandleError();

	const onSubmit = async (data: FormDataLogin) => {
		try {
			setLoading(true);
			const response = await auth(data);
			console.log("Autenticado com sucesso!", response.data);
			showToast({
				title: "Autenticado com sucesso!",
				status: "success",
			});

			navigate("/");
		} catch (e: unknown) {
			console.error("Error authenticating user:", e);
			handleError(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container>
			<Flex
				direction="column"
				align="center"
				justify="center"
				height="90vh">
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
								<Flex
									justifyContent="space-between"
									alignItems="center">
									<Button
										colorScheme="teal"
										size="lg"
										rightIcon={<MdArrowForward />}
										type="submit"
										isDisabled={loading}>
										{loading ? (
											<Spinner
												size="sm"
												mr="2"
											/>
										) : null}
										{loading ? "Autenticando" : "Entrar"}
									</Button>
									<Box>
										<Link href="/forgot-password">Esqueceu a senha?</Link>
									</Box>
								</Flex>
							</form>
						</Box>
					</CardBody>
				</Card>
			</Flex>
		</Container>
	);
}
