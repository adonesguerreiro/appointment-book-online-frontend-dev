import {
	Box,
	Button,
	Card,
	CardBody,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	Input,
	Select,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LuPlusCircle } from "react-icons/lu";
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
	selectedAvailableTime?: FormDataAvailableTime | null;
}

export default function AvaliableTimeForm({
	onSubmit,
	onCancel,
	isEditing,
	selectedAvailableTime,
}: AvaliableTimeFormProps) {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<FormDataAvailableTime>({
		resolver: yupResolver(availableTimeSchema),
		defaultValues: {
			day: "",
			period: "",
			startTime: "",
			endTime: "",
			interval: 0,
		},
	});

	useEffect(() => {
		if (selectedAvailableTime) {
			reset({
				day: selectedAvailableTime.day,
				period: selectedAvailableTime.period,
				startTime: selectedAvailableTime.startTime,
				endTime: selectedAvailableTime.endTime,
				interval: selectedAvailableTime.interval,
			});
		}
	}, [selectedAvailableTime, reset]);

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
						<FormControl isInvalid={!!errors.day}>
							<Grid>
								<FormLabel>Dia da semana</FormLabel>
								<Select
									id="day"
									placeholder="Selecione um dia da semana"
									{...register("day")}>
									<option value="MONDAY">Segunda-feira</option>
									<option value="TUESDAY">Terça-feira</option>
									<option value="WEDNESDAY">Quarta-feira</option>
									<option value="THURSDAY">Quinta-feira</option>
									<option value="FRIDAY">Sexta-feira</option>
									<option value="SATURDAY">Sábado</option>
									<option value="SUNDAY">Domingo</option>
								</Select>

								{errors.day && (
									<FormErrorMessage>{errors.day.message}</FormErrorMessage>
								)}
							</Grid>
						</FormControl>

						<FormControl isInvalid={!!errors.period}>
							<Grid>
								<FormLabel>Período</FormLabel>
								<Select
									id="period"
									placeholder="Selecione um período"
									{...register("period")}>
									<option value="MORNING">Manhã</option>
									<option value="AFTERNOON">Tarde</option>
									<option value="EVENING">Noite</option>
								</Select>

								{errors.period && (
									<FormErrorMessage>{errors.period.message}</FormErrorMessage>
								)}
							</Grid>
						</FormControl>

						<FormControl isInvalid={!!errors.startTime}>
							<Grid>
								<FormLabel>Horário de início</FormLabel>
								<Input
									as={InputMask}
									mask="99:99"
									placeholder="08:00"
									type="text"
									id="startTime"
									{...register("startTime")}
								/>
								{errors.startTime && (
									<FormErrorMessage>
										{errors.startTime.message}
									</FormErrorMessage>
								)}
							</Grid>
						</FormControl>

						<FormControl isInvalid={!!errors.endTime}>
							<Grid>
								<FormLabel>Horário final</FormLabel>
								<Input
									as={InputMask}
									mask="99:99"
									placeholder="19:00"
									type="text"
									id="endTime"
									{...register("endTime")}
								/>
								{errors.endTime && (
									<FormErrorMessage>{errors.endTime.message}</FormErrorMessage>
								)}
							</Grid>
						</FormControl>

						<FormControl isInvalid={!!errors.interval}>
							<Grid>
								<FormLabel>Intervalo em minutos</FormLabel>
								<Input
									placeholder="45"
									type="text"
									id="interval"
									maxLength={5}
									{...register("interval")}
								/>
								{errors.interval && (
									<FormErrorMessage>{errors.interval.message}</FormErrorMessage>
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
