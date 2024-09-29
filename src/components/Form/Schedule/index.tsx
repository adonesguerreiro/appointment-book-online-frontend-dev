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
import { LuPlusCircle } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";
import { FormDataSchedule } from "../../../interface/FormDataSchedule";
import { yupResolver } from "@hookform/resolvers/yup";
import { scheduleSchema } from "../../../pages/Schedule/scheduleSchema";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getCustomers, getServices } from "../../../services/api";
import { CustomJwtPayload } from "../../../interface/CustomJwtPayload";
import { jwtDecode } from "jwt-decode";
import DatePicker from "react-datepicker";

interface ScheduleFormProps {
	onSubmit: (data: FormDataSchedule) => void;
	onCancel: () => void;
	isEditing: boolean;
	onEdit: (data: FormDataSchedule) => void;
	selectedSchedule?: FormDataSchedule | null;
}

export default function ScheduleForm({
	onSubmit,
	onCancel,
	isEditing,
	selectedSchedule,
}: ScheduleFormProps) {
	const {
		handleSubmit,
		register,
		reset,
		control,
		formState: { errors },
	} = useForm<FormDataSchedule>({
		resolver: yupResolver(scheduleSchema),
		defaultValues: {},
	});
	const [customers, setCustomers] = useState<FormDataSchedule[]>([]);
	const [services, setServices] = useState<FormDataSchedule[]>([]);

	const { token } = useAuth();

	useEffect(() => {
		const fetchData = async () => {
			if (!token) return;
			if (selectedSchedule) {
				reset({
					customerName: selectedSchedule.customerName,
					serviceName: selectedSchedule.serviceName,
					date: selectedSchedule.date,
					status: selectedSchedule.status,
				});
			} else {
				try {
					const decoded = jwtDecode<CustomJwtPayload>(token);
					const companyId = decoded.id;
					const [customersData, servicesData] = await Promise.all([
						getCustomers(companyId),
						getServices(companyId),
					]);
					setCustomers(customersData.data);
					setServices(servicesData.data);
				} catch (err) {
					console.error("Erro ao buscar dados", err);
				}
			}
		};

		fetchData();
	}, [selectedSchedule, reset, token]);

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
						<FormControl isInvalid={!!errors.customerName}>
							<Grid>
								<FormLabel>Cliente</FormLabel>
								<Select
									placeholder="Selecione o cliente"
									{...register("customerId")}>
									{customers.map((customer) => (
										<option
											key={customer.id}
											value={customer.id}>
											{customer.customerName}
										</option>
									))}
								</Select>

								{errors.customerName && (
									<FormErrorMessage>
										{errors.customerName.message}
									</FormErrorMessage>
								)}
							</Grid>
						</FormControl>

						<FormControl isInvalid={!!errors.customerName}>
							<Grid>
								<FormLabel>Serviço</FormLabel>
								<Select
									placeholder="Selecione o serviço"
									{...register("serviceId")}>
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

						<FormControl isInvalid={!!errors.date}>
							<Grid>
								<FormLabel>Data</FormLabel>
								<Controller
									name="date"
									control={control}
									render={({ field }) => (
										<DatePicker
											id="date"
											selected={field.value ? new Date(field.value) : null}
											onChange={(date) => field.onChange(date?.toISOString())}
											customInput={
												<Input
													as={InputMask}
													mask="99/99/9999"
													placeholder="Selecione uma data"
												/>
											}
											dateFormat="dd/MM/yyyy"
										/>
									)}
								/>

								{errors.date && (
									<FormErrorMessage>{errors.date.message}</FormErrorMessage>
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
									<option value="SCHEDULED">Agendado</option>
									<option value="CANCELLED">Cancelado</option>
									<option value="ATTENDED">Atendido</option>
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
	);
}