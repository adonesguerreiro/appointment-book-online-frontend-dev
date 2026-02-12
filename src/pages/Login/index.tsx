import {
	Card,
	CardHeader,
	Heading,
	CardBody,
	Box,
	Text,
	Flex,
	Input,
	Button,
	Container,
	Spinner,
	Link,
	Field,
} from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
import { useForm } from "react-hook-form";
import { FormDataLogin } from "../../interface/FormDataLogin";
import { loginSchema } from "../../validators/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, refreshToken } from "../../services/api";
import { useLoading } from "../../hooks/useLoading";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useHandleError } from "../../hooks/useHandleError";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
	const { refreshUser } = useAuth();

	const handleError = useHandleError();

	const onSubmit = async (data: FormDataLogin) => {
		try {
			setLoading(true);
			await auth(data);
			await refreshToken();
			await refreshUser();

			showToast({
				title: "Autenticado com sucesso!",
				type: "success",
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
				<Card.Root asChild>
					<CardHeader
						display="grid"
						gap="0.625rem"
						fontFamily="Roboto, sans-serif">
						<Heading
							size="lg"
							fontWeight="semibold"
							asChild><h1>Seja bem vindo de volta</h1></Heading>
						<Box>
							<Text
								fontSize="lg"
								asChild><h2>Por favor, entre com suas credenciais </h2></Text>
						</Box>
					</CardHeader>

					<CardBody
						width="52.5625rem"
						height="40.6875rem">
						<Box
							display="grid"
							placeItems="center">
							<form onSubmit={handleSubmit(onSubmit)}>
								<Field.Root
									display="grid"
									alignItems="center"
									width="25.0625rem"
									padding="0.625rem"
									gap="0.625rem"
									invalid={!!errors}>
									<Field.Label>Email</Field.Label>
									<Input
										type="email"
										placeholder="Insira seu email"
										id="email"
										{...register("email")}
									/>
									{errors.email && (
										<Field.ErrorText>{errors.email.message}</Field.ErrorText>
									)}

									<Field.Label>Senha</Field.Label>
									<Input
										type="password"
										placeholder="Insira sua senha"
										id="password"
										{...register("password")}
									/>
									{errors.password && (
										<Field.ErrorText>
											{errors.password.message}
										</Field.ErrorText>
									)}
								</Field.Root>
								<Flex
									justifyContent="space-between"
									alignItems="center">
									<Button colorPalette="teal" size="lg" type="submit" disabled={loading}>{loading ? (
											<Spinner
												size="sm"
												mr="2"
											/>
										) : null}{loading ? "Autenticando" : "Entrar"}{<MdArrowForward />}</Button>
									<Box>
										<Link href="/forgot-password">Esqueceu a senha?</Link>
									</Box>
								</Flex>
							</form>
						</Box>
					</CardBody>
				</Card.Root>
			</Flex>
        </Container>
    );
}
