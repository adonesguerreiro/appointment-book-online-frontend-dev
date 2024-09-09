import {
	Avatar,
	Box,
	Button,
	Card,
	CardBody,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Spinner,
	useToast,
	// useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormDataUser } from "../../interface/FormDataUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "./userSchema";
import { MdCancel, MdSave } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../services/api";
import { useEffect, useState } from "react";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import { AxiosError } from "axios";

interface CustomJwtPayload extends JwtPayload {
	id: number;
}
export default function UserPage() {
	const [loading, setLoading] = useState(false);
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: { errors },
	} = useForm<FormDataUser>({
		resolver: yupResolver(userSchema),
		mode: "onChange",
	});

	const { token } = useAuth();

	useEffect(() => {
		if (!token) {
			return;
		}

		const fetchDataUser = async () => {
			try {
				const decoded = jwtDecode<CustomJwtPayload>(token);
				const userId = decoded.id;
				const userData = await getUserById(userId);
				setValue("name", userData.data.name);
				setValue("email", userData.data.email);
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		};

		fetchDataUser();
	}, [setValue, token]);

	const toast = useToast();
	console.log("Erros:", errors);
	const onSubmit = async (data: FormDataUser) => {
		setLoading(true);
		try {
			if (token) {
				const decoded = jwtDecode<CustomJwtPayload>(token);
				const userId = decoded.id;
				const updatedUser = await updateUser(userId, data);
				if (updatedUser.status === 200) {
					toast({
						title: "Salvo com sucesso!",
						status: "success",
						duration: 3000,
						isClosable: true,
						position: "top-right",
					});

					setLoading(false);
					navigate("/");
					return;
				}
			}
		} catch (error) {
			console.error("Erro ao salvar dados", error);

			if (error instanceof AxiosError) {
				const errors = error.response?.data.errors[0];

				toast({
					title: errors.message,
					status: "warning",
					duration: 3000,
					isClosable: true,
					position: "top-right",
				});
			}
			setLoading(false);
			return;
		}
	};

	const navigate = useNavigate();

	const onCancel = () => {
		reset();
		navigate("/");
	};

	return (
		<Container>
			<Flex
				display="flex"
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<Heading
					as="h1"
					size="lg"
					fontWeight="semibold">
					Usuário
				</Heading>
				<Card>
					<CardBody
						width="52.5625rem"
						height="40.6875rem">
						<Box
							as="form"
							display="grid"
							placeItems="center"
							onSubmit={handleSubmit(onSubmit)}>
							<Avatar
								size="lg"
								name="Adones"
								src="https://avatars.githubusercontent.com/u/60514105?v=4"
							/>
							<FormControl
								display="grid"
								alignItems="center"
								width="25.0625rem"
								padding="0.625rem"
								isInvalid={!!errors}>
								<FormLabel>Nome</FormLabel>
								<Input
									type="name"
									placeholder="Informe seu nome"
									id="name"
									{...register("name")}
									isInvalid={!!errors.name}
								/>
								{errors.name && (
									<FormErrorMessage>{errors.name.message}</FormErrorMessage>
								)}

								<FormLabel>Email</FormLabel>
								<Input
									type="email"
									placeholder="adones@example.com"
									id="email"
									{...register("email")}
									isInvalid={!!errors.email}
								/>
								{errors.email && (
									<FormErrorMessage>{errors.email.message}</FormErrorMessage>
								)}

								<FormLabel>Senha atual</FormLabel>
								<Input
									type="password"
									placeholder="Senha atual"
									id="password"
									{...register("password")}
									isInvalid={!!errors.password}
								/>
								{errors.password && (
									<FormErrorMessage>{errors.password.message}</FormErrorMessage>
								)}
							</FormControl>

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
								alignItems="center"
								justifyContent="flex-end">
								<Button
									colorScheme="blue"
									size="lg"
									type="submit"
									isDisabled={loading}
									rightIcon={<MdSave />}>
									{loading ? (
										<Spinner
											size="sm"
											mr="2"
										/>
									) : null}
									{loading ? "Validando dados" : "Salvar"}
								</Button>
								<Button
									colorScheme="gray"
									size="lg"
									margin="0.625rem"
									rightIcon={<MdCancel />}
									onClick={onCancel}>
									Cancelar
								</Button>
							</Flex>
						</Box>
					</CardBody>
				</Card>
			</Flex>
		</Container>
	);
}
