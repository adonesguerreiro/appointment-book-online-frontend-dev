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
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { LuPlusCircle } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { FormDataUnavailableTime } from "../../../interface/FormDataUnavailableTime";
import { unavailableTimeSchema } from "../../../validators/unavailableTimeSchema";
import InputMask from "react-input-mask";
import { TbEditCircle } from "react-icons/tb";
import "react-datepicker/dist/react-datepicker.css";

interface UnavailableTimeProps {
	onSubmit: (data: FormDataUnavailableTime) => void;
	onCancel: () => void;
	isEditing: boolean;
	onEdit: (data: FormDataUnavailableTime) => void;
	selectedUnavailableTime?: FormDataUnavailableTime | null;
}

export default function UnavailableTimeForm({
	onSubmit,
	onCancel,
	isEditing,
	selectedUnavailableTime,
}: UnavailableTimeProps) {
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm<FormDataUnavailableTime>({
		resolver: yupResolver(unavailableTimeSchema),
	});
	console.log("Erros:", errors);
	useEffect(() => {
		if (selectedUnavailableTime) {
			reset({
				date: selectedUnavailableTime.date,
				startTime: selectedUnavailableTime.startTime,
				endTime: selectedUnavailableTime.endTime,
			});
		}
	}, [selectedUnavailableTime, reset]);

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
						<FormControl isInvalid={!!errors.date}>
							<Grid>
								<Flex alignItems="center">
									<FormLabel>Data</FormLabel>
								</Flex>

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
											// minDate={new Date()}
											dateFormat="dd/MM/yyyy"
										/>
									)}
								/>

								{errors.date && (
									<FormErrorMessage>{errors.date.message}</FormErrorMessage>
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
