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
	Badge,
} from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoading } from "../../../../hooks/useLoading";
import { useCustomToast } from "../../../../hooks/useCustomToast";
import HeadingComponent from "../../../../components/Heading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordSchema } from "../../validators/resetPasswordSchema";
import { FormDataResetPassword } from "../../interface/FormDataResetPassword";
import { resetPassword } from "../../../../services/api";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
	const { showToast } = useCustomToast();
	const { loading, setLoading } = useLoading();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(resetPasswordSchema),
	});
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [time, setTime] = useState(5 * 60);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	if (time === 0) {
		navigate("/login");

		return;
	}


	const onSubmit = async (data: FormDataResetPassword) => {
		try {
			const token = searchParams.get("token");
			if (!token) {
				throw new Error("Token de redefinição não encontrado.");
			}

			setLoading(true);
			const resetMyPassword = await resetPassword(token, data);
			if (resetMyPassword.status === 200) {
				setLoading(false);
				showToast({
					title: "Senha redefinida com sucesso!",
					status: "success",
				});
				navigate("/login");
			}
		} catch (error) {
			console.error("Error reseting password:", error);
			setLoading(false);
			showToast({
				title:
					"Falha ao redefinir a senha, pois seu prazo de redefinição expirou, redirecionando para o login...",
				status: "error",
			});
			navigate("/login");
		}
	};

	return (
		<Container>
			<Flex
				direction="column"
				align="center"
				justify="center"
				height="90vh">
				<Badge
					colorScheme={minutes === 0 ? "red" : "green"}
					mb="4">
					Tempo restante: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
				</Badge>
				<Card>
					<CardHeader
						display="grid"
						gap="0.625rem"
						fontFamily="Roboto, sans-serif">
						<HeadingComponent title="Redefina sua senha" />
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
									isInvalid={!!errors.newPassword || !!errors.confirmPassword}>
									<FormLabel>Nova senha</FormLabel>
									<Input
										type="password"
										placeholder="Nova senha"
										id="newPassword"
										{...register("newPassword")}
									/>
									{errors.newPassword && (
										<FormErrorMessage>
											{errors.newPassword.message}
										</FormErrorMessage>
									)}
									<FormLabel>Confirmar nova senha</FormLabel>
									<Input
										type="password"
										placeholder="Confirmar nova senha"
										id="confirmPassword"
										{...register("confirmPassword")}
									/>
									{errors.confirmPassword && (
										<FormErrorMessage>
											{errors.confirmPassword.message}
										</FormErrorMessage>
									)}
								</FormControl>
								<Flex
									justifyContent="right"
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
