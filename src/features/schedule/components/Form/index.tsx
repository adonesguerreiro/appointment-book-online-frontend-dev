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
	Spinner,
	Container,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";
import { FormDataSchedule } from "../../../schedule/interface/FormDataSchedule";
import { yupResolver } from "@hookform/resolvers/yup";
import { scheduleSchema } from "../../validators/scheduleSchema";
import InputMask from "@kerim-keskin/react-input-mask";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import { TimeSlot } from "../../interface/TimeSlot";
import {
	getCustomerById,
	getCustomers,
} from "@/features/customer/services/api";
import {
	keepPreviousData,
	useInfiniteQuery,
	useQuery,
} from "@tanstack/react-query";
import { getServices } from "@/features/services/services/api";
import SectionHeader from "@/shared/components/SectionHeader";
import { Select as SelectScroll } from "chakra-react-select";

interface ScheduleFormProps {
	onSubmit: (data: FormDataSchedule) => void;
	onCancel: () => void;
	isEditing: boolean;
	onEdit: (data: FormDataSchedule) => void;
	selectedSchedule?: FormDataSchedule | null;
	selectedDate: string;
	timeSlots: TimeSlot[];
	onDateChange: (date: string) => void;
	isLoading: boolean;
}

export default function ScheduleForm({
	onSubmit,
	onCancel,
	isEditing,
	selectedSchedule,
	timeSlots,
	onDateChange,
	isLoading,
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

	const { data: selectedCustomer, isLoading: isLoadingCustomer } = useQuery({
		queryKey: ["selectedCustomer", selectedSchedule?.customerId],
		queryFn: () =>
			selectedSchedule?.customerId &&
			getCustomerById(Number(selectedSchedule?.customerId)),
		enabled: !!selectedSchedule?.customerId,
		placeholderData: keepPreviousData,
	});

	const {
		data: allCustomers,
		fetchNextPage: fetchNextCustomers,
		hasNextPage: hasNextCustomers,
		isFetchingNextPage: isFetchingNextCustomers,
	} = useInfiniteQuery({
		queryKey: ["customers"],
		queryFn: async ({ pageParam = 1 }) => {
			const response = await getCustomers(pageParam);
			return response;
		},
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.currentPage < lastPage.totalPages
				? allPages.length + 1
				: undefined;
		},
		initialPageParam: 1,
	});

	const customers = allCustomers?.pages.flatMap((page) => page.customers) ?? [];

	const finalCustomers = selectedCustomer
		? customers.some((c) => c.id === selectedCustomer.id)
			? customers
			: [selectedCustomer, ...customers]
		: customers;

	const filterCustomers = finalCustomers.map((c) => ({
		value: c.id,
		label: c.customerName,
	}));

	const loadMoreCustomers = () => {
		if (hasNextCustomers && !isFetchingNextCustomers) {
			fetchNextCustomers();
		}
	};

	const { data: selectedService, isLoading: isLoadingService } = useQuery({
		queryKey: ["selectedService", selectedSchedule?.serviceId],
		queryFn: () =>
			selectedSchedule?.customerId &&
			getCustomerById(Number(selectedSchedule?.serviceId)),
		enabled: !!selectedSchedule?.serviceId,
		placeholderData: keepPreviousData,
	});

	const {
		data: allServices,
		fetchNextPage: fetchNextServices,
		hasNextPage: hasNextServices,
		isFetchingNextPage: isFetchingNextServices,
	} = useInfiniteQuery({
		queryKey: ["services"],
		queryFn: async ({ pageParam = 1 }) => {
			const response = await getServices(pageParam);
			return response;
		},
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.currentPage < lastPage.totalPages
				? allPages.length + 1
				: undefined;
		},
		initialPageParam: 1,
	});

	const services = allServices?.pages.flatMap((page) => page.services) ?? [];

	const finalServices = selectedService
		? services.some((s) => s.id === selectedService.id)
			? services
			: [selectedService, ...services]
		: services;

	const filterServices = finalServices.map((s) => ({
		value: s.id,
		label: s.serviceName,
	}));

	const loadMoreServices = () => {
		if (hasNextServices && !isFetchingNextServices) {
			fetchNextServices();
		}
	};

	useEffect(() => {
		if (isEditing && selectedSchedule) reset(selectedSchedule);
	}, [isEditing, reset, selectedSchedule]);

	return (
		<Container>
			<Flex
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<SectionHeader title="Agenda" />
				{isLoading ? (
					<Spinner />
				) : (
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
											{isLoadingCustomer ? (
												<Spinner size="sm" />
											) : (
												<Controller
													control={control}
													name="customerId"
													render={({ field }) => (
														<SelectScroll
															noOptionsMessage={() =>
																"Nenhum cliente encontrado."
															}
															menuPortalTarget={document.body}
															styles={{
																menuPortal: (provided) => ({
																	...provided,
																	zIndex: 9999,
																	padding: 0,
																}),
															}}
															{...field}
															options={filterCustomers}
															onChange={(option) =>
																field.onChange(option?.value)
															}
															value={filterCustomers.find(
																(c) => c.value === field.value,
															)}
															onMenuScrollToBottom={loadMoreCustomers}
														/>
													)}
												/>
											)}

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
											{isLoadingService ? (
												<Spinner size="sm" />
											) : (
												<Controller
													control={control}
													name="serviceId"
													render={({ field }) => (
														<SelectScroll
															noOptionsMessage={() =>
																"Nenhum serviço encontrado."
															}
															menuPortalTarget={document.body}
															styles={{
																menuPortal: (provided) => ({
																	...provided,
																	zIndex: 9999,
																	padding: 0,
																}),
															}}
															{...field}
															options={filterServices}
															onChange={(option) =>
																field.onChange(option?.value)
															}
															value={filterServices.find(
																(s) => s.value === field.value,
															)}
															onMenuScrollToBottom={loadMoreServices}
														/>
													)}
												/>
											)}

											{errors.serviceId && (
												<FormErrorMessage>
													{errors.serviceId.message}
												</FormErrorMessage>
											)}
										</Grid>
									</FormControl>

									<FormControl isInvalid={!!errors.date}>
										<Grid
											sx={{
												".react-datepicker-popper": {
													zIndex: 9999,
												},
											}}>
											<FormLabel>Data</FormLabel>
											<Controller
												control={control}
												{...register("date")}
												render={({ field }) => (
													<DatePicker
														locale={ptBR}
														id="date"
														popperClassName="react-datepicker-popper"
														selected={
															field.value ? new Date(field.value) : null
														}
														onChange={(date: Date | null) => {
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
												<FormErrorMessage>
													{errors.date.message}
												</FormErrorMessage>
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
												{timeSlots?.length > 0 ? (
													timeSlots.map((slot, index) =>
														slot.avaliableTimeSlot.map(
															(avaliableSlot, subIndex) => (
																<option
																	key={`${index}-${subIndex}`}
																	value={avaliableSlot.timeSlot}>
																	{avaliableSlot.timeSlot}
																</option>
															),
														),
													)
												) : (
													<option value="">Sem horários disponíveis</option>
												)}
											</Select>
											{errors.timeSlotAvaliable && (
												<FormErrorMessage>
													{errors.timeSlotAvaliable.message}
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
												<FormErrorMessage>
													{errors.status.message}
												</FormErrorMessage>
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
				)}
			</Flex>
		</Container>
	);
}
