import {
	Flex,
	Avatar,
	Box,
	Text,
	Card,
	CardBody,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	Input,
	Select,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BookingAppointmentData } from "../../../pages/BookAppointment";
import InputMask from "react-input-mask";

interface BookingAppointmentProps {
	register: UseFormRegister<BookingAppointmentData>;
	errors: FieldErrors<BookingAppointmentData>;
}

export default function BookingAppointment({
	errors,
	register,
}: BookingAppointmentProps) {
	const services = [
		{ id: "1", serviceName: "Consulta" },
		{ id: "2", serviceName: "Exame" },
		{ id: "3", serviceName: "Curso" },
		{ id: "4", serviceName: "Palestra" },
		{ id: "5", serviceName: "Treinamento" },
		{ id: "6", serviceName: "Workshop" },
		{ id: "7", serviceName: "Outro" },
	];

	return (
		<>
			<Flex
				justify="center"
				align="center"
				padding="1rem">
				<Avatar
					src="https://bit.ly/sage-adebayo"
					size="xl"
				/>
				<Box ml="3">
					<Text fontWeight="bold">Segun Adebayo</Text>
				</Box>
			</Flex>
			<Card
				padding={4}
				marginBottom={5}
				width="25rem"
				mx="auto">
				<CardBody>
					<FormControl isInvalid={!!errors.customerName}>
						<Grid>
							<FormLabel>Nome</FormLabel>
							<Input
								type="text"
								placeholder="Nome do cliente"
								id="customerName"
								{...register("customerName")}
							/>
							{errors.customerName && (
								<FormErrorMessage>
									{errors.customerName.message}
								</FormErrorMessage>
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
								<FormErrorMessage>{errors.mobile.message}</FormErrorMessage>
							)}
						</Grid>
					</FormControl>
					<FormControl isInvalid={!!errors.serviceName}>
						<Grid>
							<FormLabel>Serviço</FormLabel>
							<Select
								placeholder="Selecione o serviço"
								{...register("serviceName")}>
								{services.map((service) => (
									<option
										key={service.id}
										value={service.id}>
										{service.serviceName}
									</option>
								))}
							</Select>
							{errors.serviceName && (
								<FormErrorMessage>
									{errors.serviceName.message}
								</FormErrorMessage>
							)}
						</Grid>
					</FormControl>
				</CardBody>
			</Card>
		</>
	);
}
