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
	Heading,
	Input,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormDataUser } from "../../interface/FormDataUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "./userSchema";
import { MdSave } from "react-icons/md";

export default function UserPage() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormDataUser>({
		resolver: yupResolver(userSchema),
	});

	const toast = useToast();

	const onSubmit = () => {
		toast({
			title: "Salvo com sucesso!",
			status: "info",
			duration: 3000,
			isClosable: true,
			position: "top-right",
		});
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

								<FormLabel>Nova senha</FormLabel>
								<Input
									type="password"
									placeholder="Nova senha"
									id="newPassword"
									{...register("newPassword")}
									isInvalid={!!errors.newPassword}
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
									isInvalid={!!errors.confirmPassword}
								/>
								{errors.confirmPassword && (
									<FormErrorMessage>
										{errors.confirmPassword.message}
									</FormErrorMessage>
								)}
							</FormControl>

							<Button
								colorScheme="blue"
								size="lg"
								type="submit"
								rightIcon={<MdSave />}>
								Salvar
							</Button>
						</Box>
					</CardBody>
				</Card>
			</Flex>
		</Container>
	);
}
