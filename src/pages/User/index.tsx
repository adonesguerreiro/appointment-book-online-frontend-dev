import {
	Box,
	Button,
	Card,
	Container,
	Field,
	Flex,
	Input,
	Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormDataUser } from "../../interface/FormDataUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../validators/userSchema";
import { MdCancel, MdSave } from "react-icons/md";
import { useEffect } from "react";
import { useUser } from "../../hooks/User/useUser";
import { useUserSubmit } from "../../hooks/User/useUserSubmit";
import HeadingComponent from "../../components/Heading";
import { useUserCancel } from "../../hooks/User/useUserCancel";
import CropperComponent from "../../components/Cropper";

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

	const { fetchDataUser } = useUser({ reset });
	const { handleCancel } = useUserCancel();
	const { handleSubmitUser, loading } = useUserSubmit();

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
				<Card.Root>
					<Card.Body
						width="52.5625rem"
						height="40.6875rem">
						<Box
							as="form"
							display="grid"
							placeItems="center"
							onSubmit={handleSubmit(handleSubmitUser)}>
							<Field.Label>Foto de perfil</Field.Label>
							<CropperComponent />

							<Field.Root
								display="grid"
								alignItems="center"
								width="25.0625rem"
								padding="0.625rem"
								invalid={!!errors}>
								<Field.Label>Nome</Field.Label>
								<Input
									type="name"
									placeholder="Informe seu nome"
									id="name"
									{...register("name")}
								/>
								{errors.name && (
									<Field.ErrorText>{errors.name.message}</Field.ErrorText>
								)}

								<Field.Label>Email</Field.Label>
								<Input
									type="email"
									placeholder="adones@example.com"
									id="email"
									{...register("email")}
								/>
								{errors.email && (
									<Field.ErrorText>{errors.email.message}</Field.ErrorText>
								)}

								<Field.Label>Senha atual</Field.Label>
								<Input
									type="password"
									placeholder="Senha atual"
									id="password"
									{...register("password")}
								/>
								{errors.password && (
									<Field.ErrorText>{errors.password.message}</Field.ErrorText>
								)}
							</Field.Root>

							<Field.Root
								display="grid"
								alignItems="center"
								width="25.0625rem"
								padding="0.625rem"
								invalid={!!errors.newPassword || !!errors.confirmPassword}>
								<Field.Label>Nova senha</Field.Label>
								<Input
									type="password"
									placeholder="Nova senha"
									id="newPassword"
									{...register("newPassword")}
								/>
								{errors.newPassword && (
									<Field.ErrorText>
										{errors.newPassword.message}
									</Field.ErrorText>
								)}
								<Field.Label>Confirmar nova senha</Field.Label>
								<Input
									type="password"
									placeholder="Confirmar nova senha"
									id="confirmPassword"
									{...register("confirmPassword")}
								/>
								{errors.confirmPassword && (
									<Field.ErrorText>
										{errors.confirmPassword.message}
									</Field.ErrorText>
								)}
							</Field.Root>

							<Flex
								alignItems="center"
								justifyContent="flex-end">
								<Button
									colorScheme="blue"
									size="lg"
									type="submit"
									disabled={loading}>
									{loading ? (
										<Spinner
											size="sm"
											mr="2"
										/>
									) : null}
									{loading ? "Validando dados" : "Salvar"} <MdSave />
								</Button>
								<Button
									colorScheme="gray"
									size="lg"
									margin="0.625rem"
									onClick={handleCancel}>
									Cancelar <MdCancel />
								</Button>
							</Flex>
						</Box>
					</Card.Body>
				</Card.Root>
			</Flex>
		</Container>
	);
}
