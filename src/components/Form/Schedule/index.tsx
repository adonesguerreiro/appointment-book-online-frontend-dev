import {
	Flex,
	Box,
	Grid,
	Input,
	Button,
	Card,
	Field,
	NativeSelect,
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

	const { allServices } = useScheduleServiceEdit(
		selectedSchedule ?? ({} as FormDataSchedule),
	);
	const { allCustomers } = useScheduleCustomerEdit(
		selectedSchedule ?? ({} as FormDataSchedule),
	);

	useEffect(() => {
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
	}, [selectedSchedule, allCustomers, allServices, reset, isEditing]);

	return (
        <Card.Root>
            <Card.Body
				width="25.0625rem"
				height="40.6875rem"
				padding="0.625rem">
				<Box asChild><form onSubmit={handleSubmit(onSubmit)}>
                        <Grid gap="0.625rem">
                            <Field.Root invalid={!!errors.customerId}>
                                <Grid>
                                    <Field.Label>Cliente</Field.Label>
                                    <NativeSelect.Root {...register("customerId")}>
                                        <NativeSelect.Field placeholder="Selecione o cliente">
                                            {allCustomers.map((customer) => (
                                                <option
                                                    key={customer.id}
                                                    value={customer.id}>
                                                    {customer.customerName}
                                                </option>
                                            ))}
                                        </NativeSelect.Field>
                                    </NativeSelect.Root>

                                    {errors.customerId && (
                                        <Field.ErrorText>{errors.customerId.message}</Field.ErrorText>
                                    )}
                                </Grid>
                            </Field.Root>

                            <Field.Root invalid={!!errors.serviceId}>
                                <Grid>
                                    <Field.Label>Serviço</Field.Label>
                                    <NativeSelect.Root {...register("serviceId")}>
                                        <NativeSelect.Field placeholder="Selecione o serviço">
                                            {allServices?.map((service) => (
                                                <option
                                                    key={service.id}
                                                    value={service.id}>
                                                    {service.serviceName}
                                                </option>
                                            ))}
                                        </NativeSelect.Field>
                                    </NativeSelect.Root>
                                    {errors.serviceId && (
                                        <Field.ErrorText>{errors.serviceId.message}</Field.ErrorText>
                                    )}
                                </Grid>
                            </Field.Root>

                            <Field.Root invalid={!!errors.date}>
                                <Grid>
                                    <Field.Label>Data</Field.Label>
                                    <Controller
                                        control={control}
                                        {...register("date")}
                                        render={({ field }) => (
                                            <DatePicker
                                                locale={ptBR}
                                                id="date"
                                                selected={field.value ? new Date(field.value) : null}
                                                onChange={(date: Date | null) => {
                                                    field.onChange(date?.toISOString());
                                                    if (date && !isEditing) {
                                                        onDateChange(date.toISOString().split("T")[0]);
                                                    } else if (date && isEditing) {
                                                        onDateChange(date.toISOString());
                                                    }
                                                }}
                                                customInput={
                                                    <Input asChild><InputMask mask="99/99/9999" placeholder="Selecione uma data" value={field.value} /></Input>
                                                }
                                                minDate={new Date()}
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        )}
                                    />

                                    {errors.date && (
                                        <Field.ErrorText>{errors.date.message}</Field.ErrorText>
                                    )}
                                </Grid>
                            </Field.Root>

                            <Field.Root invalid={!!errors.timeSlotAvaliable}>
                                <Grid>
                                    <Field.Label>Horário</Field.Label>
                                    <NativeSelect.Root
                                        size="md"
                                        {...register("timeSlotAvaliable")}>
                                        {timeSlots.length > 0 ? (
                                            timeSlots.map((slot, index) =>
                                                slot.avaliableTimeSlot.map((avaliableSlot, subIndex) => (
                                                    <option
                                                        key={`${index}-${subIndex}`}
                                                        value={avaliableSlot.timeSlot}>
                                                        {avaliableSlot.timeSlot}
                                                    </option>
                                                )),
                                            )
                                        ) : (
                                            <option value="">Sem horários disponíveis</option>
                                        )}
                                    </NativeSelect.Root>
                                    {errors.avaliableTimeSlot && (
                                        <Field.ErrorText>
                                            {errors.avaliableTimeSlot.message}
                                        </Field.ErrorText>
                                    )}
                                </Grid>
                            </Field.Root>

                            <Field.Root invalid={!!errors.status}>
                                <Grid>
                                    <Field.Label>Status</Field.Label>
                                    <NativeSelect.Root
                                        id="status"
                                        {...register("status")}>
                                        <NativeSelect.Field placeholder="Selecione o status">
                                            {!isEditing ? (
                                                <option value="SCHEDULED">Agendado</option>
                                            ) : (
                                                <>
                                                    <option value="SCHEDULED">Agendado</option>
                                                    <option value="CANCELLED">Cancelado</option>
                                                    <option value="ATTENDED">Atendido</option>
                                                </>
                                            )}
                                        </NativeSelect.Field>
                                    </NativeSelect.Root>

                                    {errors.status && (
                                        <Field.ErrorText>{errors.status.message}</Field.ErrorText>
                                    )}
                                </Grid>
                            </Field.Root>
                        </Grid>
                        <Flex justifyContent="flex-end">
                            {!isEditing ? (
                                <Button
                                    colorPalette="green"
                                    size="lg"
                                    type="submit"
                                    margin="0.625rem">
                                    Cadastrar <LuPlus />
                                </Button>
                            ) : (
                                <Button
                                    colorPalette="blue"
                                    size="lg"
                                    type="submit"
                                    margin="0.625rem">
                                    Editar <TbEditCircle />
                                </Button>
                            )}

                            <Button
                                colorPalette="gray"
                                size="lg"
                                margin="0.625rem"
                                onClick={onCancel}>
                                Cancelar <MdCancel />
                            </Button>
                        </Flex>
                    </form></Box>
			</Card.Body>
        </Card.Root>
    );
}
