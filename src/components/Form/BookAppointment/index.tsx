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
import { FormDataService } from "../../../interface/FormDataService";
import { FormDataUser } from "../../../interface/FormDataUser";

interface BookingAppointmentProps {
	register: UseFormRegister<BookingAppointmentData>;
	errors: FieldErrors<BookingAppointmentData>;
	user: FormDataUser;
	services: FormDataService[];
}

export default function BookingAppointment({
	errors,
	register,
	user,
	services,
}: BookingAppointmentProps) {
	return (
		<>
			<Flex
				justify="center"
				align="center"
				padding="1rem">
				<Avatar
					src={
						typeof user?.avatarUrl === "string"
							? user?.avatarUrl
							: user?.avatarUrl
							? URL.createObjectURL(user?.avatarUrl)
							: undefined
					}
					size="xl"
				/>
				<Box ml="3">
					<Text fontWeight="bold">{user?.name}</Text>
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
					<FormControl isInvalid={!!errors.customerPhone}>
						<Grid>
							<FormLabel>Celular</FormLabel>
							<Input
								as={InputMask}
								mask="(99) 99999-9999"
								placeholder="(99) 99999-9999"
								type="tel"
								id="customerPhone"
								{...register("customerPhone")}
							/>
							{errors.customerPhone && (
								<FormErrorMessage>
									{errors.customerPhone.message}
								</FormErrorMessage>
							)}
						</Grid>
					</FormControl>
					<FormControl isInvalid={!!errors.serviceId}>
						<Grid>
							<FormLabel>Serviço</FormLabel>
							<Select
								placeholder="Selecione o serviço"
								{...register("serviceId")}>
								{services.length > 0 ? (
									services.map((service) => (
										<option
											key={service.id}
											value={service.id}>
											{service.serviceName}
										</option>
									))
								) : (
									<option value="0">Nenhum serviço encontrado</option>
								)}
							</Select>
							{errors.serviceId && (
								<FormErrorMessage>{errors.serviceId.message}</FormErrorMessage>
							)}
						</Grid>
					</FormControl>
				</CardBody>
			</Card>
		</>
	);
}
