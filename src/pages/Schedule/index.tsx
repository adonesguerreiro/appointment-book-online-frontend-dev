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
	Select,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputMask from "react-input-mask";

import { MdCancel } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";
import { useState } from "react";
import TableSchedule from "../../components/TableSchedule";
import { scheduleSchema } from "./scheduleSchema";
import { FormDataSchedule } from "../../interface/FormDataSchedule";

export default function SchedulePage() {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<FormDataSchedule>({
		resolver: yupResolver(scheduleSchema),
	});

	const [showForm, setShowForm] = useState(false);

	const toast = useToast();

	const onSubmit = async () => {
		toast({
			title: "Horário disponível registrado com sucesso.",
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
					Agenda
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
									<FormControl isInvalid={!!errors.customerId}>
										<Grid>
											<FormLabel>Cliente</FormLabel>
											<Input
												placeholder="ex: José Silva"
												type="text"
												id="customerId"
												{...register("customerId")}
											/>
											{errors.customerId && (
												<FormErrorMessage>
													{errors.customerId.message}
												</FormErrorMessage>
											)}
										</Grid>
									</FormControl>

									<FormControl isInvalid={!!errors.serviceId}>
										<Grid>
											<FormLabel>Serviço</FormLabel>
											<Input
												as={InputMask}
												mask="99:99"
												placeholder="19:00"
												type="text"
												id="serviceId"
												{...register("serviceId")}
											/>
											{errors.serviceId && (
												<FormErrorMessage>
													{errors.serviceId.message}
												</FormErrorMessage>
											)}
										</Grid>
									</FormControl>

									<FormControl isInvalid={!!errors.date}>
										<Grid>
											<FormLabel>Data</FormLabel>
											<Input
												placeholder="45"
												type="text"
												id="date"
												maxLength={5}
												{...register("date")}
											/>
											{errors.date && (
												<FormErrorMessage>
													{errors.date.message}
												</FormErrorMessage>
											)}
										</Grid>
									</FormControl>

									<FormControl isInvalid={!!errors.status}>
										<Grid>
											<FormLabel>Dia da semana</FormLabel>
											<Select
												id="status"
												placeholder="Selecione o status"
												{...register("status")}>
												<option value="SCHEDULED">Agendado</option>
												<option value="CANCELLED">Cancelado</option>
												<option value="ATTENDED">Atendido</option>
											</Select>

											{errors.status && (
												<FormErrorMessage>
													{errors.status.message}
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
					<TableSchedule
						onNewClick={function (): void {
							setShowForm(true);
						}}
					/>
				)}
			</Flex>
		</Container>
	);
}
