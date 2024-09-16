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
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "./serviceSchema";
import { MdCancel } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";
import { TbEditCircle } from "react-icons/tb";
import { CurrencyInput } from "react-currency-mask";
import InputMask from "react-input-mask";

import { FormDataService } from "../../interface/FormDataService";
import TableService from "./TableService";
import { useState } from "react";
import ModalComponent from "../../components/Modal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
	createService,
	getServicesById,
	updateService,
} from "../../services/api";
import { AxiosError } from "axios";

export default function ServicePage() {
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm<FormDataService>({
		resolver: yupResolver(serviceSchema),
		defaultValues: { name: "", duration: "", price: 0 },
	});

	const [showForm, setShowForm] = useState(false);
	const [selectedService, setSelectedService] =
		useState<FormDataService | null>(null);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const toast = useToast();
	const navigate = useNavigate();
	const { token } = useAuth();

	console.error(errors);
	const onSubmit = async (data: FormDataService) => {
		try {
			if (token && !selectedService) {
				const createdService = await createService(data);
				if (createdService.status === 200) {
					toast({
						title: "Serviço registrado com sucesso.",
						status: "success",
						duration: 3000,
						isClosable: true,
						position: "top-right",
					});
					setShowForm(false);
					navigate("/service");
				}
			} else {
				await updateService(Number(selectedService), data);
				toast({
					title: "Serviço alterado com sucesso.",
					status: "info",
					duration: 3000,
					isClosable: true,
					position: "top-right",
				});
				setShowForm(false);
				navigate("/service");
			}
		} catch (error) {
			console.error("Erro ao salvar dados", error);
			if (error instanceof AxiosError) {
				const errors = error.response?.data.errors[0];

				toast({
					title: errors.message,
					status: "warning",
					duration: 3000,
					isClosable: true,
					position: "top-right",
				});
			}
		}
	};

	const handleEditClick = async (serviceId: number) => {
		try {
			const serviceData = await getServicesById(serviceId);

			setSelectedService(serviceData.data.id);
			reset({
				name: serviceData.data.name,
				duration: serviceData.data.duration,
				price: Number(serviceData.data.price),
			});

			setShowForm(true);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	const onCancel = () => {
		reset({
			name: "",
			duration: "",
			price: 0,
		});
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
									{!selectedService ? (
										<Button
											colorScheme="green"
											size="lg"
											type="submit"
											margin="0.625rem"
											rightIcon={<LuPlusCircle />}>
											Cadastrar
										</Button>
									) : (
										<Button
											colorScheme="blue"
											size="lg"
											type="submit"
											margin="0.625rem"
											rightIcon={<TbEditCircle />}>
											Editar
										</Button>
									)}

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
						onNewClick={() => {
							setSelectedService(null);
							setShowForm(true);
						}}
						onEditClick={(serviceId: number) => {
							handleEditClick(serviceId);
						}}
						openModal={onOpen}
					/>
				)}
				<ModalComponent
					isOpen={isOpen}
					onClose={onClose}
				/>
			</Flex>
		</Container>
	);
}
