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
	useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "./serviceSchema";
import { AiOutlinePlus } from "react-icons/ai";
import { CurrencyInput } from "react-currency-mask";
import InputMask from "react-input-mask";

import { FormDataService } from "../../interface/FormDataService";

export default function ServicePage() {
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm<FormDataService>({
		resolver: yupResolver(serviceSchema),
	});

	const toast = useToast();

	const onSubmit = () => {
		toast({
			title: "Serviço registrado com sucesso.",
			status: "success",
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
					Serviço
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
											placeholder="Nome do serviço"
											id="name"
											{...register("name")}
										/>
										{errors.name && (
											<FormErrorMessage>{errors.name.message}</FormErrorMessage>
										)}
									</Grid>
								</FormControl>

								<FormControl isInvalid={!!errors.duration}>
									<Grid>
										<FormLabel>Duração</FormLabel>
										<Input
											as={InputMask}
											mask="99:99"
											placeholder="45:00"
											type="text"
											id="duration"
											{...register("duration")}
										/>
										{errors.duration && (
											<FormErrorMessage>
												{errors.duration.message}
											</FormErrorMessage>
										)}
									</Grid>
								</FormControl>

								<FormControl isInvalid={!!errors.price}>
									<Grid>
										<FormLabel>Preço</FormLabel>
										<Controller
											name="price"
											control={control}
											render={({ field }) => (
												<CurrencyInput
													value={field.value}
													onChangeValue={(_, value) => {
														field.onChange(value);
													}}
													InputElement={
														<Input
															type="text"
															placeholder="R$ 100,00"
															id="price"
															maxLength={10}
															{...register("price")}
														/>
													}
												/>
											)}
										/>

										{errors.price && (
											<FormErrorMessage>
												{errors.price.message}
											</FormErrorMessage>
										)}
									</Grid>
								</FormControl>
							</Flex>

							<Button
								colorScheme="green"
								size="lg"
								type="submit"
								margin="0.625rem"
								rightIcon={<AiOutlinePlus />}>
								Cadastrar
							</Button>
						</Box>
					</CardBody>
				</Card>
			</Flex>
		</Container>
	);
}
