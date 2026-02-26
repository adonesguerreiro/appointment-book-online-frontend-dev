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
	Input,
	Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormDataUser } from "../interface/FormDataUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../validators/userSchema";
import { MdCancel, MdSave } from "react-icons/md";
import { useCallback, useEffect } from "react";
import HeadingComponent from "../../../shared/components/Heading";
import CropperComponent from "../../../shared/components/Cropper";
import { useAvatar } from "../hooks/useAvatar";
import { getUserById, updateUpload, updateUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useHandleError } from "@/shared/hooks/useHandleError";
import { useLoading } from "@/shared/hooks/useLoading";
import { useProfilePhoto } from "../hooks/useProfilePhoto";

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

const { setInitialAvatar } = useAvatar();
		const navigate = useNavigate();
			const handleError = useHandleError();
		const { showToast } = useCustomToast();
		const { loading, setLoading } = useLoading();
		const { profilePhoto } = useProfilePhoto();

	const fetchDataUser = useCallback(async () => {
		try {
			const { data } = await getUserById();
			reset({
				avatarUrl: data.avatarUrl,
				name: data.name,
				email: data.email,
			});
			if (data.avatarUrl) {
				setInitialAvatar(data.avatarUrl);
			}

			return data;
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	}, [reset, setInitialAvatar]);

	const handleCancel = () => {
		reset();
		navigate("/");
	};

		const handleSubmitUser = async (data: FormDataUser) => {
			setLoading(true);
			try {
				const formData = new FormData();
				formData.append("name", data.name);
				formData.append("email", data.email);
				formData.append("password", data.password || "");
				data.avatarUrl = profilePhoto;
				if (data.avatarUrl instanceof File) {
					formData.append("avatarUrl", data.avatarUrl);
				}
				console.log([...formData.entries()]);

				const updateUploadUser = await updateUpload(formData);
				const updatedUser = await updateUser(data);

				if (updatedUser.status === 200 || updateUploadUser?.status === 200) {
					showToast({
						title: "Salvo com sucesso!",
						status: "success",
					});
					setLoading(false);
					navigate("/");
					return;
				}
			} catch (error) {
				console.error("Erro ao salvar dados", error);
				handleError(error);
				setLoading(false);
				return;
			}
		};

	useEffect(() => {
		fetchDataUser();
	}, [fetchDataUser]);

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
							<CropperComponent />

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
