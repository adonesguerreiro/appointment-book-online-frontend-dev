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
import { useCustomToast } from "../../../../shared/hooks/useCustomToast";
import HeadingComponent from "../../../../shared/components/Heading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordSchema } from "../../validators/resetPasswordSchema";
import { FormDataResetPassword } from "../../interface/FormDataResetPassword";
import { createPassword } from "../../services/auth";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHandleError } from "@/shared/hooks/useHandleError";

export default function CreatePasswordPage() {
	const { showToast } = useCustomToast();
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
	const handleError = useHandleError();
	const queryClient = useQueryClient();

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

		if (time === 0) {
			navigate("/login");
		}

		return () => clearInterval(interval);
	}, [navigate, time]);

	const mutation = useMutation({
		mutationFn: (data: FormDataResetPassword) => {
			const token = searchParams.get("token");
			if (!token) {
				throw new Error("Token de criação de senha não encontrado.");
			}
			return createPassword(token, data);
		},
		onSuccess: () => {
			showToast({
				title: "Senha criada com sucesso!",
				status: "success",
			});
			queryClient.invalidateQueries({ queryKey: ["services"] });
			navigate("/login");
		},
		onError: (error) => {
			handleError(error);
		},
	});

	const onSubmit = (data: FormDataResetPassword) => {
		mutation.mutate(data);
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
						<HeadingComponent title="Criar nova senha" />
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
										isDisabled={mutation.isPending}>
										{mutation.isPending ? (
											<Spinner
												size="sm"
												mr="2"
											/>
										) : null}
										{mutation.isPending ? "Enviando..." : "Criar senha"}
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
