import {
	Box,
	Button,
	Card,
	Container,
	Flex,
	Field,
	Grid,
	Heading,
	Input,
	Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companySchema } from "../../validators/companySchema";
import { MdCancel, MdSave } from "react-icons/md";
import InputMask from "react-input-mask";
import { FormDataCompany } from "../../interface/FormDataCompany";
import { viaCep } from "../../services/viaCep";
import { useEffect, useState } from "react";
import { useCompany } from "../../hooks/Company/useCompany";
import { useCompanySubmit } from "../../hooks/Company/useCompanySubmit";
import { useCompanyCancel } from "../../hooks/Company/useCompanyCancel";

export default function CompanyPage() {
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
	});
	const [postalCodeData, setPostalCodeData] = useState<string>();

	const { fetchDataCompany } = useCompany({ reset, setPostalCodeData });
	const { handleSubmitCompany, loading } = useCompanySubmit({
		setValue,
		postalCodeData: postalCodeData || "",
		setError,
	});
	const { handleCancel } = useCompanyCancel({ reset });

	useEffect(() => {
		fetchDataCompany();
	}, [fetchDataCompany]);



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
				<Card.Root>
					<Card.Body
						width="60.5625rem"
						height="40.6875rem">
						<Box
							as="form"
							onSubmit={handleSubmit(handleSubmitCompany)}>
							<Flex gap="0.625rem">
								<Field.Root invalid={!!errors.name}>
									<Grid>
										<Field.Label>Nome</Field.Label>
										<Input
											type="text"
											placeholder="Informe seu nome"
											id="name"
											{...register("name")}
										/>
										{errors.name && (
											<Field.ErrorText>{errors.name.message}</Field.ErrorText>
										)}
									</Grid>
								</Field.Root>

								<Field.Root invalid={!!errors.mobile}>
									<Grid>
										<Field.Label>Celular</Field.Label>
										<Input
											as={InputMask}
											mask="(99) 99999-9999"
											placeholder="(99) 99999-9999"
											type="tel"
											id="mobile"
											{...register("mobile")}
										/>
										{errors.mobile && (
											<Field.ErrorText>{errors.mobile.message}</Field.ErrorText>
										)}
									</Grid>
								</Field.Root>

								<Field.Root invalid={!!errors.email}>
									<Grid>
										<Field.Label flex="1">E-mail</Field.Label>
										<Input
											flex="2"
											type="email"
											placeholder="adones@example.com"
											id="email"
											{...register("email")}
										/>
										{errors.email && (
											<Field.ErrorText>{errors.email.message}</Field.ErrorText>
										)}
									</Grid>
								</Field.Root>

								<Field.Root invalid={!!errors.cnpj}>
									<Field.Label>CNPJ</Field.Label>
									<Input
										as={InputMask}
										mask="99.999.999/9999-99"
										placeholder="99.999.999/9999-99"
										type="text"
										id="cnpj"
										{...register("cnpj")}
									/>
									{errors.cnpj && (
										<Field.ErrorText>{errors.cnpj.message}</Field.ErrorText>
									)}
								</Field.Root>
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
								<Field.Root invalid={!!errors.street}>
									<Grid>
										<Field.Label>Logradouro</Field.Label>
										<Input
											type="text"
											placeholder="Informe seu endereço"
											id="street"
											{...register("street")}
										/>
										{errors.street && (
											<Field.ErrorText>{errors.street.message}</Field.ErrorText>
										)}
									</Grid>
								</Field.Root>

								<Field.Root invalid={!!errors.number}>
									<Grid>
										<Field.Label>Número</Field.Label>
										<Input
											type="text"
											placeholder="Nº"
											id="number"
											{...register("number")}
										/>
										{errors.number && (
											<Field.ErrorText>{errors.number.message}</Field.ErrorText>
										)}
									</Grid>
								</Field.Root>

								<Field.Root invalid={!!errors.complement}>
									<Field.Label>Complemento</Field.Label>
									<Input
										placeholder="Complemento"
										type="text"
										id="complement"
										{...register("complement")}
									/>
									{errors.complement && (
										<Field.ErrorText>
											{errors.complement.message}
										</Field.ErrorText>
									)}
								</Field.Root>

								<Field.Root invalid={!!errors.neighborhood}>
									<Field.Label>Bairro</Field.Label>
									<Input
										placeholder="Bairro"
										type="text"
										id="neighborhood"
										{...register("neighborhood")}
									/>
									{errors.neighborhood && (
										<Field.ErrorText>
											{errors.neighborhood.message}
										</Field.ErrorText>
									)}
								</Field.Root>
							</Flex>

							<Flex
								gap="0.625rem"
								padding="0.625rem">
								<Field.Root invalid={!!errors.postalCode}>
									<Field.Label>CEP</Field.Label>
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
										<Field.ErrorText>
											{errors.postalCode.message}
										</Field.ErrorText>
									)}
								</Field.Root>
								<Field.Root invalid={!!errors.city}>
									<Field.Label>Cidade</Field.Label>
									<Input
										placeholder="Cidade"
										type="text"
										id="city"
										disabled
										{...register("city")}
									/>
									{errors.city && (
										<Field.ErrorText>{errors.city.message}</Field.ErrorText>
									)}
								</Field.Root>

								<Field.Root invalid={!!errors.state}>
									<Field.Label>Estado</Field.Label>
									<Input
										placeholder="Estado"
										type="text"
										id="state"
										disabled
										{...register("state")}
									/>
									{errors.state && (
										<Field.ErrorText>{errors.state.message}</Field.ErrorText>
									)}
								</Field.Root>
							</Flex>
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
