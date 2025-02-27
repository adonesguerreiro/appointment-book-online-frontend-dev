import {
	Card,
	CardHeader,
	CardBody,
	Box,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Button,
	FormErrorMessage,
	Container,
	Spinner,
} from "@chakra-ui/react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPassword } from "../../services/api";
import { useLoading } from "../../hooks/useLoading";
import { useCustomToast } from "../../hooks/useCustomToast";
import HeadingComponent from "../../components/Heading";
import { useNavigate } from "react-router-dom";
import { forgotPasswordSchema } from "../../validators/forgotPasswordSchema";
import { FormDataForgotPassword } from "../../interface/FormDataForgotPassword";

export default function ForgotPasswordPage() {
	const { showToast } = useCustomToast();
	const { loading, setLoading } = useLoading();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(forgotPasswordSchema),
	});

	const navigate = useNavigate();
	// console.log("Erros:", errors);

	const onSubmit = async (data: FormDataForgotPassword) => {
		try {
			setLoading(true);
			const forgotMyPassword = await forgotPassword(data);
			if (forgotMyPassword.status === 200) {
				setLoading(false);
				showToast({
					title:
						"Solicitação de redefinição de senha enviada com sucesso, verifique o email.",
					status: "success",
				});
				navigate("/login");
			}
		} catch (error) {
			console.error("Error reseting password:", error);
			setLoading(false);
			showToast({
				title: "Falha ao redefinir senha!",
				status: "error",
			});
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
						<HeadingComponent title="Informe seu email para recuperar acesso" />
					</CardHeader>

					<CardBody
						width="52.5625rem"
						height="40.6875rem">
						<Box
							display="grid"
							placeItems="center">
							<form onSubmit={handleSubmit(onSubmit)}>
								<FormControl
									width="25.0625rem"
									padding="0.625rem"
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
								</FormControl>
								<Flex
									justifyContent="space-between"
									alignItems="center">
									<Button
										colorScheme="teal"
										size="lg"
										leftIcon={<MdArrowBack />}
										type="button"
										onClick={() => {
											navigate("/login");
										}}>
										Login
									</Button>
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
										{loading ? "Verificando" : "Enviar"}
									</Button>
								</Flex>
							</form>
						</Box>
					</CardBody>
				</Card>
			</Flex>
		</Container>
	);
}
