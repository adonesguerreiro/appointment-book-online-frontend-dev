import {
	Box,
	Button,
	Card,
	CardBody,
	Field,
	Flex,
	Grid,
	Input,
	NativeSelect,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { FormDataAvailableTime } from "../../../interface/FormDataAvailableTime";
import InputMask from "react-input-mask";
import { availableTimeSchema } from "../../../validators/availableTimeSchema";
import { useEffect } from "react";
import { TbEditCircle } from "react-icons/tb";

interface AvaliableTimeFormProps {
	onSubmit: (data: FormDataAvailableTime) => void;
	onCancel: () => void;
	isEditing: boolean;
	onEdit: (data: FormDataAvailableTime) => void;
	selectedAvaliableTime?: FormDataAvailableTime | null;
}

export default function AvaliableTimeForm({
	onSubmit,
	onCancel,
	isEditing,
	selectedAvaliableTime,
}: AvaliableTimeFormProps) {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<FormDataAvailableTime>({
		resolver: yupResolver(availableTimeSchema),
	});

	useEffect(() => {
		if (selectedAvaliableTime) {
			reset({
				day: selectedAvaliableTime.day,
				period: selectedAvaliableTime.period,
				startTime: selectedAvaliableTime.startTime,
				endTime: selectedAvaliableTime.endTime,
				interval: selectedAvaliableTime.interval,
			});
		}
	}, [selectedAvaliableTime, reset]);

	return (
		<Card.Root>
			<CardBody
				width="25.0625rem"
				height="40.6875rem"
				padding="0.625rem">
				<Box
					as="form"
					onSubmit={handleSubmit(onSubmit)}>
					<Grid gap="0.625rem">
						<Field.Root invalid={!!errors.day}>
							<Grid>
								<Field.Label>Dia da semana</Field.Label>
								<NativeSelect.Root
									id="day"
									{...register("day")}>
									<NativeSelect.Field placeholder="Selecione um dia da semana">
										<option value="MONDAY">Segunda-feira</option>
										<option value="TUESDAY">Terça-feira</option>
										<option value="WEDNESDAY">Quarta-feira</option>
										<option value="THURSDAY">Quinta-feira</option>
										<option value="FRIDAY">Sexta-feira</option>
										<option value="SATURDAY">Sábado</option>
										<option value="SUNDAY">Domingo</option>
									</NativeSelect.Field>
								</NativeSelect.Root>

								{errors.day && (
									<Field.ErrorText>{errors.day.message}</Field.ErrorText>
								)}
							</Grid>
						</Field.Root>

						<Field.Root invalid={!!errors.period}>
							<Grid>
								<Field.Label>Período</Field.Label>
								<NativeSelect.Root
									id="period"
									{...register("period")}>
									<NativeSelect.Field placeholder="Selecione um período">
										<option value="MORNING">Manhã</option>
										<option value="AFTERNOON">Tarde</option>
										<option value="EVENING">Noite</option>
									</NativeSelect.Field>
								</NativeSelect.Root>

								{errors.period && (
									<Field.ErrorText>{errors.period.message}</Field.ErrorText>
								)}
							</Grid>
						</Field.Root>

						<Field.Root invalid={!!errors.startTime}>
							<Grid>
								<Field.Label>Horário de início</Field.Label>
								<Input
									as={InputMask}
									mask="99:99"
									defaultValue={isEditing ? "startTime" : ""}
									placeholder="08:00"
									type="text"
									id="startTime"
									{...register("startTime")}
								/>
								{errors.startTime && (
									<Field.ErrorText>{errors.startTime.message}</Field.ErrorText>
								)}
							</Grid>
						</Field.Root>

						<Field.Root invalid={!!errors.endTime}>
							<Grid>
								<Field.Label>Horário final</Field.Label>
								<Input
									as={InputMask}
									mask="99:99"
									defaultValue={isEditing ? "endTime" : ""}
									placeholder="19:00"
									type="text"
									id="endTime"
									{...register("endTime")}
								/>
								{errors.endTime && (
									<Field.ErrorText>{errors.endTime.message}</Field.ErrorText>
								)}
							</Grid>
						</Field.Root>

						<Field.Root invalid={!!errors.interval}>
							<Grid>
								<Field.Label>Intervalo em minutos</Field.Label>
								<Input
									placeholder="45"
									type="text"
									id="interval"
									maxLength={5}
									disabled={isEditing}
									{...register("interval")}
								/>
								{errors.interval && (
									<Field.ErrorText>{errors.interval.message}</Field.ErrorText>
								)}
							</Grid>
						</Field.Root>
					</Grid>

					<Flex justifyContent="flex-end">
						{!isEditing ? (
							<Button
								colorScheme="green"
								size="lg"
								type="submit"
								margin="0.625rem">
								Cadastrar <LuPlus />
							</Button>
						) : (
							<Button
								colorScheme="blue"
								size="lg"
								type="submit"
								margin="0.625rem">
								Editar <TbEditCircle />
							</Button>
						)}

						<Button
							colorScheme="gray"
							size="lg"
							margin="0.625rem"
							onClick={onCancel}>
							Cancelar <MdCancel />
						</Button>
					</Flex>
				</Box>
			</CardBody>
		</Card.Root>
	);
}
