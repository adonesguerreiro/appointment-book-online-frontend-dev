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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companySchema } from "../../validators/companySchema";
import { MdCancel, MdSave } from "react-icons/md";
import InputMask from "@kerim-keskin/react-input-mask";
import { FormDataCompany } from "../../interface/FormDataCompany";
import { viaCep } from "../../services/viaCep";
import { useEffect, useState } from "react";
import { getCompany, updateCompany } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useHandleError } from "@/shared/hooks/useHandleError";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function CompanyForm() {
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		setError,
		formState: { errors },
	} = useForm<FormDataCompany>({
		resolver: yupResolver(companySchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			mobile: "",
			cnpj: "",
			street: "",
			number: "",
			complement: "",
			neighborhood: "",
			city: "",
			state: "",
			postalCode: "",
		},
	});
	const [postalCodeData, setPostalCodeData] = useState<string>();
	const navigate = useNavigate();
	const { showToast } = useCustomToast();

	const handleError = useHandleError();

	const handleSubmitCompany = (data: FormDataCompany) => {
		mutation.mutate(data);
	};

	const mutation = useMutation({
		mutationFn: async (data: FormDataCompany) => {
			if (postalCodeData !== data.postalCode) {
				const existingCep = await viaCep(data.postalCode);

				if (existingCep === "CEP inválido") {
					setValue("city", "");
					setValue("state", "");
					setValue("postalCode", "");
					setError("postalCode", {
						type: "manual",
						message: existingCep,
					});
					return;
				}

				data.city = existingCep.localidade;
				data.state = existingCep.uf;
				setValue("city", existingCep.localidade);
				setValue("state", existingCep.uf);
			}

			return updateCompany(data);
		},
		onSuccess: () => {
			showToast({
				title: "Alterado com sucesso!",
				status: "success",
			});
		},
		onError: (error: unknown) => {
			console.error("Erro ao salvar dados", error);
			handleError(error);
		},
	});

	const handleCancel = () => {
		navigate("/");
	};

	const { data: company } = useQuery({
		queryKey: ["company"],
		queryFn: getCompany,
	});

	useEffect(() => {
		if (company) {
			reset({
				name: company.name,
				email: company.email,
				mobile: company.mobile,
				cnpj: company.cnpj,
				street: company.addresses.street,
				number: company.addresses.number,
				complement: company.addresses.complement,
				neighborhood: company.addresses.neighborhood,
				city: company.addresses.city,
				state: company.addresses.state,
				postalCode: company.addresses.postalCode,
			});
		}
	}, [company, reset, setPostalCodeData]);

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
							onSubmit={handleSubmit(handleSubmitCompany)}>
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
											onChange: (e) => {
												setPostalCodeData(e.target.value);
											},
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
