import {
	Flex,
	Card,
	CardBody,
	Box,
	Grid,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
	Select,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";
import { FormDataSchedule } from "../../../interface/FormDataSchedule";
import { yupResolver } from "@hookform/resolvers/yup";
import { scheduleSchema } from "../../../validators/scheduleSchema";
import InputMask from "react-input-mask";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale";
import { TimeSlot } from "../../../interface/TimeSlot";
import { extractTimeFromDate } from "../../../utils/extractTimeFromDate";
import { useScheduleServiceEdit } from "../../../hooks/Schedule/useScheduleServiceEdit";
import { useScheduleCustomerEdit } from "../../../hooks/Schedule/useScheduleCustomerEdit";

interface ScheduleFormProps {
	onSubmit: (data: FormDataSchedule) => void;
	onCancel: () => void;
	isEditing: boolean;
	onEdit: (data: FormDataSchedule) => void;
	selectedSchedule?: FormDataSchedule | null;
	selectedDate: string;
	timeSlots: TimeSlot[];
	onDateChange: (date: string) => void;
}

export default function ScheduleForm({
	onSubmit,
	onCancel,
	isEditing,
	selectedSchedule,
	timeSlots,
	onDateChange,
}: ScheduleFormProps) {
	const {
		handleSubmit,
		register,
		reset,
		control,
		formState: { errors },
	} = useForm<FormDataSchedule>({
		resolver: yupResolver(scheduleSchema),
	});

	const { token, logout } = useAuth();
	const { allServices } = useScheduleServiceEdit(
		selectedSchedule ?? ({} as FormDataSchedule)
	);
	const { allCustomers } = useScheduleCustomerEdit(
		selectedSchedule ?? ({} as FormDataSchedule)
	);

	// console.log("Erros:", errors);
	useEffect(() => {
		if (!token) {
			logout();
			return;
		}

		const customerReady =
			selectedSchedule?.customerId &&
			allCustomers.some((c) => c.id === selectedSchedule.customerId);

		const serviceReady =
			selectedSchedule?.serviceId &&
			allServices.some((s) => s.id === selectedSchedule.serviceId);

		if (isEditing && selectedSchedule && customerReady && serviceReady) {
			reset({
				customerId: selectedSchedule.customerId,
				serviceId: selectedSchedule.serviceId,
				date: selectedSchedule.date,
				status: selectedSchedule.status,
				timeSlotAvaliable: extractTimeFromDate(selectedSchedule.date),
			});
		}
	}, [
		selectedSchedule,
		allCustomers,
		allServices,
		reset,
		token,
		logout,
		isEditing,
	]);

	return (
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
								<Select
									placeholder="Selecione o cliente"
									{...register("customerId")}>
									{allCustomers.map((customer) => (
										<option
											key={customer.id}
											value={customer.id}>
											{customer.customerName}
										</option>
									))}
								</Select>

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
								<Select
									placeholder="Selecione o serviço"
									{...register("serviceId")}>
									{allServices?.map((service) => (
										<option
											key={service.id}
											value={service.id}>
											{service.serviceName}
										</option>
									))}
								</Select>
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
								<Controller
									control={control}
									{...register("date")}
									render={({ field }) => (
										<DatePicker
											locale={ptBR}
											id="date"
											selected={field.value ? new Date(field.value) : null}
											onChange={(date) => {
												field.onChange(date?.toISOString());
												if (date && !isEditing) {
													onDateChange(date.toISOString().split("T")[0]);
												} else if (date && isEditing) {
													onDateChange(date.toISOString());
												}
											}}
											customInput={
												<Input
													as={InputMask}
													mask="99/99/9999"
													placeholder="Selecione uma data"
													value={field.value}
												/>
											}
											minDate={new Date()}
											dateFormat="dd/MM/yyyy"
										/>
									)}
								/>

								{errors.date && (
									<FormErrorMessage>{errors.date.message}</FormErrorMessage>
								)}
							</Grid>
						</FormControl>

						<FormControl isInvalid={!!errors.timeSlotAvaliable}>
							<Grid>
								<FormLabel>Horário</FormLabel>
								<Select
									size="md"
									sx={{
										maxHeight: "200px",
										overflowY: "scroll",
										position: "relative",
										zIndex: 10,
									}}
									{...register("timeSlotAvaliable")}>
									{timeSlots.length > 0 ? (
										timeSlots.map((slot, index) =>
											slot.avaliableTimeSlot.map((avaliableSlot, subIndex) => (
												<option
													key={`${index}-${subIndex}`}
													value={avaliableSlot.timeSlot}>
													{avaliableSlot.timeSlot}
												</option>
											))
										)
									) : (
										<option value="">Sem horários disponíveis</option>
									)}
								</Select>
								{errors.avaliableTimeSlot && (
									<FormErrorMessage>
										{errors.avaliableTimeSlot.message}
									</FormErrorMessage>
								)}
							</Grid>
						</FormControl>

						<FormControl isInvalid={!!errors.status}>
							<Grid>
								<FormLabel>Status</FormLabel>
								<Select
									id="status"
									placeholder="Selecione o status"
									{...register("status")}>
									{!isEditing ? (
										<option value="SCHEDULED">Agendado</option>
									) : (
										<>
											<option value="SCHEDULED">Agendado</option>
											<option value="CANCELLED">Cancelado</option>
											<option value="ATTENDED">Atendido</option>
										</>
									)}
								</Select>

								{errors.status && (
									<FormErrorMessage>{errors.status.message}</FormErrorMessage>
								)}
							</Grid>
						</FormControl>
					</Grid>

					<Flex justifyContent="flex-end">
						{!isEditing ? (
							<Button
								colorScheme="green"
								size="lg"
								type="submit"
								margin="0.625rem"
								rightIcon={<LuPlus />}>
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
	);
}
