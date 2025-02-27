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
import { userSchema } from "../../validators/userSchema";
import { MdCancel, MdSave } from "react-icons/md";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "../../hooks/User/useUser";
import { useUserSubmit } from "../../hooks/User/useUserSubmit";
import HeadingComponent from "../../components/Heading";
import { useUserCancel } from "../../hooks/User/useUserCancel";
import { useDropzone } from "react-dropzone";
// import { useUserSubmitUpload } from "../../hooks/User/useUserSubmitUpload";

export default function UserPage() {
	const {
		handleSubmit,
		register,
		reset,
		getValues,
		formState: { errors },
	} = useForm<FormDataUser>({
		resolver: yupResolver(userSchema),
		mode: "onChange",
	});

	const { fetchDataUser } = useUser({ reset });
	const { handleCancel } = useUserCancel();
	const { handleSubmitUser, loading } = useUserSubmit();
	// const { handleSubmitUserUpload } = useUserSubmitUpload();
	const [avatar, setAvatar] = useState<File | string>("");

	const inputRef = useRef(null);
	const onDrop = useCallback((acceptedFiles: string | unknown[]) => {
		if (acceptedFiles.length > 0) {
			const file = acceptedFiles[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatar(reader.result as string);
			};
			reader.readAsDataURL(file as Blob);
		}
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	useEffect(() => {
		fetchDataUser();
	}, [fetchDataUser]);

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
							<FormLabel>Foto de perfil</FormLabel>
							<Box
								{...getRootProps()}
								position="relative"
								cursor="pointer"
								w="fit-content">
								<Avatar
									size="xl"
									id="avatar"
									name={getValues("name") || ""}
									src={(avatar as string) || (getValues("avatarUrl") as string)}
								/>
								<Input
									ref={inputRef}
									{...getInputProps({ size: undefined })}
									id="avatarUrl"
									type="file"
									accept="image/*"
									position="absolute"
									top={0}
									left={0}
									width="100%"
									height="100%"
									opacity={0}
									cursor="pointer"
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (file) {
											if (avatar) {
												URL.revokeObjectURL(avatar as string);
											}
											const objectUrl = URL.createObjectURL(file);
											setAvatar(objectUrl);
											reset({ avatarUrl: file });
										}
									}}
								/>
							</Box>

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
