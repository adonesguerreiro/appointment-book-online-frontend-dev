import {
	Flex,
	Avatar,
	Box,
	Text,
	Card,
	Grid,
	Input,
	Field,
	NativeSelect,
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
				<Avatar.Root />
				<Box ml="3">
					<Text fontWeight="bold">{user?.name}</Text>
				</Box>
			</Flex>
			<Card.Root
				padding={4}
				marginBottom={5}
				width="25rem"
				mx="auto">
				<Card.Body>
					<Field.Root invalid={!!errors.customerName}>
						<Grid>
							<Field.Label>Nome</Field.Label>
							<Input
								type="text"
								placeholder="Nome do cliente"
								id="customerName"
								{...register("customerName")}
							/>
							{errors.customerName && (
								<Field.ErrorText>{errors.customerName.message}</Field.ErrorText>
							)}
						</Grid>
					</Field.Root>
					<Field.Root invalid={!!errors.customerPhone}>
						<Grid>
							<Field.Label>Celular</Field.Label>
							<Input
								{...register("customerPhone")}
								asChild>
								<InputMask
									mask="(99) 99999-9999"
									placeholder="(99) 99999-9999"
									type="tel"
									id="customerPhone"
								/>
							</Input>
							{errors.customerPhone && (
								<Field.ErrorText>
									{errors.customerPhone.message}
								</Field.ErrorText>
							)}
						</Grid>
					</Field.Root>
					<Field.Root invalid={!!errors.serviceId}>
						<Grid>
							<Field.Label>Serviço</Field.Label>
							<NativeSelect.Root {...register("serviceId")}>
								<NativeSelect.Field placeholder="Selecione o serviço">
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
								</NativeSelect.Field>
							</NativeSelect.Root>
							{errors.serviceId && (
								<Field.ErrorText>{errors.serviceId.message}</Field.ErrorText>
							)}
						</Grid>
					</Field.Root>
				</Card.Body>
			</Card.Root>
		</>
	);
}
