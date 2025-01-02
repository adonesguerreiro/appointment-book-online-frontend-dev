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
	Input,
	Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormDataUser } from "../../interface/FormDataUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "./userSchema";
import { MdCancel, MdSave } from "react-icons/md";
import { useEffect } from "react";
import { useUser } from "../../hooks/User/useUser";
import { useUserSubmit } from "../../hooks/User/useUserSubmit";
import HeadingComponent from "../../components/Heading";
import { useUserCancel } from "../../hooks/User/useUserCancel";

export default function UserPage() {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<FormDataUser>({
		resolver: yupResolver(userSchema),
		mode: "onChange",
	});

	const { fetchDataUser } = useUser();
	const { handleCancel } = useUserCancel();
	const { handleSubmitUser, loading } = useUserSubmit();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchDataUser();
				reset({
					name: data.name,
					email: data.email,
				});
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchData();
	}, [fetchDataUser, reset]);

	console.log("Erros:", errors);

	return (
		<Container>
			<Flex
				display="flex"
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<HeadingComponent title="Usuário" />
				<Card>
					<CardBody
						width="52.5625rem"
						height="40.6875rem">
						<Box
							as="form"
							display="grid"
							placeItems="center"
							onSubmit={handleSubmit(handleSubmitUser)}>
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
									onClick={handleCancel}>
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
