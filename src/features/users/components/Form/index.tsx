import {
	Box,
	Button,
	Card,
	CardBody,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	Input,
	Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormDataUser } from "../../interface/FormDataUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../validators/userSchema";
import { MdCancel, MdSave } from "react-icons/md";
import { useEffect } from "react";
import HeadingComponent from "../../../../shared/components/Heading";
import CropperComponent from "../../../../shared/components/Cropper";
import { useAvatar } from "../../hooks/useAvatar";
import { getUserById, updateUpload } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useHandleError } from "@/shared/hooks/useHandleError";
import { useProfilePhoto } from "../../hooks/useProfilePhoto";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function UserForm() {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<FormDataUser>({
		resolver: yupResolver(userSchema),
		mode: "onChange",
	});

	const { setInitialAvatar } = useAvatar();
	const navigate = useNavigate();
	const handleError = useHandleError();
	const { showToast } = useCustomToast();
	const { profilePhoto } = useProfilePhoto();

	const handleCancel = () => {
		reset();
		navigate("/");
	};

	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: getUserById,
	});

	useEffect(() => {
		if (user) {
			reset({
				avatarUrl: user.avatarUrl,
				name: user.name,
				email: user.email,
			});
			if (user.avatarUrl) {
				setInitialAvatar(user.avatarUrl);
			}

			return user;
		}
	}, [reset, setInitialAvatar, user]);

	const mutation = useMutation({
		mutationFn: async (data: FormDataUser) => {
			const formData = new FormData();
			formData.append("name", data.name);
			formData.append("email", data.email);
			formData.append("password", data.password || "");
			data.avatarUrl = profilePhoto;
			if (data.avatarUrl instanceof File) {
				formData.append("avatarUrl", data.avatarUrl);
			}
			console.log([...formData.entries()]);
			return updateUpload(formData);
		},
		onSuccess: () => {
			showToast({
				title: "Alterado com sucesso!",
				status: "success",
			});
			navigate("/");
		},
		onError: (error) => {
			console.error("Erro ao salvar dados", error);
			handleError(error);
		},
	});

	const handleSubmitUser = (data: FormDataUser) => {
		mutation.mutate(data);
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
							<FormLabel>Foto de perfil</FormLabel>
							<Grid>
								<CropperComponent />
							</Grid>

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
									isDisabled={mutation.isPending}
									rightIcon={<MdSave />}>
									{mutation.isPending ? (
										<Spinner
											size="sm"
											mr="2"
										/>
									) : null}
									{mutation.isPending ? "Validando dados" : "Salvar"}
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
