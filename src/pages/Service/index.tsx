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
import { MdCancel } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";
import { CurrencyInput } from "react-currency-mask";
import InputMask from "react-input-mask";

import { FormDataService } from "../../interface/FormDataService";
import TableService from "../../components/TableService";
import { useState } from "react";

export default function ServicePage() {
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm<FormDataService>({
		resolver: yupResolver(serviceSchema),
	});

	const [showForm, setShowForm] = useState(false);

	const toast = useToast();

	const onSubmit = () => {
		toast({
			title: "Serviço registrado com sucesso.",
			status: "success",
			duration: 3000,
			isClosable: true,
			position: "top-right",
		});
		reset();
		setShowForm(false);
	};

	const onCancel = () => {
		reset();
		setShowForm(false);
	};

	return (
		<Container>
			<Flex
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

				{showForm ? (
					<Card>
						<CardBody
							width="25.0625rem"
							height="40.6875rem"
							padding="0.625rem">
							<Box
								as="form"
								onSubmit={handleSubmit(onSubmit)}>
								<Grid gap="0.625rem">
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
												<FormErrorMessage>
													{errors.name.message}
												</FormErrorMessage>
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
								</Grid>
								<Flex justifyContent="flex-end">
									<Button
										colorScheme="green"
										size="lg"
										type="submit"
										margin="0.625rem"
										rightIcon={<LuPlusCircle />}>
										Cadastrar
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
				) : (
					<TableService
						onNewClick={function (): void {
							setShowForm(true);
						}}
					/>
				)}
			</Flex>
		</Container>
	);
}
