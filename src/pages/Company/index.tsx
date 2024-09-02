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
	Heading,
	Input,
	Spinner,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companySchema } from "./companySchema";
import { MdCancel, MdSave } from "react-icons/md";

import InputMask from "react-input-mask";
import { FormDataCompany } from "../../interface/FormDataCompany";
import { viaCep } from "../../services/viaCep";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanyPage() {
	const [loading, setLoading] = useState(false);
	const {
		handleSubmit,
		register,
		setError,
		setValue,
		reset,
		formState: { errors },
	} = useForm<FormDataCompany>({
		resolver: yupResolver(companySchema),
	});

	const toast = useToast();

	const onSubmit = async (data: FormDataCompany) => {
		setLoading(true);
		const existingCep = await viaCep(data.postalCode);

		if (existingCep != "CEP inválido") {
			setLoading(false);

			setValue("city", existingCep.localidade);
			setValue("state", existingCep.uf);

			toast({
				title: "Salvo com sucesso!",
				status: "info",
				duration: 3000,
				isClosable: true,
				position: "top-right",
			});
		} else {
			setLoading(false);
			setValue("city", "");
			setValue("state", "");

			setError("postalCode", {
				type: "manual",
				message: existingCep as string,
			});
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
					Empresa
				</Heading>
				<Card>
					<CardBody
						width="60.5625rem"
						height="40.6875rem">
						<Box
							as="form"
							onSubmit={handleSubmit(onSubmit)}>
							<Flex gap="0.625rem">
								<FormControl isInvalid={!!errors.name}>
									<Grid>
										<FormLabel>Nome</FormLabel>
										<Input
											type="text"
											placeholder="Informe seu nome"
											id="name"
											{...register("name")}
										/>
										{errors.name && (
											<FormErrorMessage>{errors.name.message}</FormErrorMessage>
										)}
									</Grid>
								</FormControl>

								<FormControl isInvalid={!!errors.mobile}>
									<Grid>
										<FormLabel>Celular</FormLabel>
										<Input
											as={InputMask}
											mask="(99) 99999-9999"
											placeholder="(99) 99999-9999"
											type="tel"
											id="mobile"
											{...register("mobile")}
										/>
										{errors.mobile && (
											<FormErrorMessage>
												{errors.mobile.message}
											</FormErrorMessage>
										)}
									</Grid>
								</FormControl>

								<FormControl isInvalid={!!errors.email}>
									<Grid>
										<FormLabel flex="1">E-mail</FormLabel>
										<Input
											flex="2"
											type="email"
											placeholder="adones@example.com"
											id="email"
											{...register("email")}
										/>
										{errors.email && (
											<FormErrorMessage>
												{errors.email.message}
											</FormErrorMessage>
										)}
									</Grid>
								</FormControl>

								<FormControl isInvalid={!!errors.cnpj}>
									<FormLabel>CNPJ</FormLabel>
									<Input
										as={InputMask}
										mask="99.999.999/9999-99"
										placeholder="99.999.999/9999-99"
										type="text"
										id="cnpj"
										{...register("cnpj")}
									/>
									{errors.cnpj && (
										<FormErrorMessage>{errors.cnpj.message}</FormErrorMessage>
									)}
								</FormControl>
							</Flex>

							<Heading
								as="h2"
								size="md"
								fontWeight="semibold"
								textAlign="left"
								padding="0.625rem">
								Endereço
							</Heading>
							<Flex
								gap="0.625rem"
								padding="0.625rem">
								<FormControl isInvalid={!!errors.street}>
									<Grid>
										<FormLabel>Logradouro</FormLabel>
										<Input
											type="text"
											placeholder="Informe seu endereço"
											id="street"
											{...register("street")}
										/>
										{errors.street && (
											<FormErrorMessage>
												{errors.street.message}
											</FormErrorMessage>
										)}
									</Grid>
								</FormControl>

								<FormControl isInvalid={!!errors.number}>
									<Grid>
										<FormLabel>Número</FormLabel>
										<Input
											type="text"
											placeholder="Nº"
											id="number"
											{...register("number")}
										/>
										{errors.number && (
											<FormErrorMessage>
												{errors.number.message}
											</FormErrorMessage>
										)}
									</Grid>
								</FormControl>

								<FormControl isInvalid={!!errors.complement}>
									<FormLabel>Complemento</FormLabel>
									<Input
										placeholder="Complemento"
										type="text"
										id="complement"
										{...register("complement")}
									/>
									{errors.complement && (
										<FormErrorMessage>
											{errors.complement.message}
										</FormErrorMessage>
									)}
								</FormControl>

								<FormControl isInvalid={!!errors.neighborhood}>
									<FormLabel>Bairro</FormLabel>
									<Input
										placeholder="Bairro"
										type="text"
										id="neighborhood"
										{...register("neighborhood")}
									/>
									{errors.neighborhood && (
										<FormErrorMessage>
											{errors.neighborhood.message}
										</FormErrorMessage>
									)}
								</FormControl>
							</Flex>

							<Flex
								gap="0.625rem"
								padding="0.625rem">
								<FormControl isInvalid={!!errors.postalCode}>
									<FormLabel>CEP</FormLabel>
									<Input
										as={InputMask}
										mask="99.999-999"
										placeholder="CEP"
										type="text"
										id="postalCode"
										{...register("postalCode", {
											validate: viaCep,
										})}
									/>
									{errors.postalCode && (
										<FormErrorMessage>
											{errors.postalCode.message}
										</FormErrorMessage>
									)}
								</FormControl>
								<FormControl isInvalid={!!errors.city}>
									<FormLabel>Cidade</FormLabel>
									<Input
										placeholder="Cidade"
										type="text"
										id="city"
										isDisabled
										{...register("city")}
									/>
									{errors.city && (
										<FormErrorMessage>{errors.city.message}</FormErrorMessage>
									)}
								</FormControl>

								<FormControl isInvalid={!!errors.state}>
									<FormLabel>Estado</FormLabel>
									<Input
										placeholder="Estado"
										type="text"
										id="state"
										isDisabled
										{...register("state")}
									/>
									{errors.state && (
										<FormErrorMessage>{errors.state.message}</FormErrorMessage>
									)}
								</FormControl>
							</Flex>
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
