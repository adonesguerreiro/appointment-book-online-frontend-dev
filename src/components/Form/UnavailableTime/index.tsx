import {
	Box,
	Button,
	Card,
	Flex,
	Grid,
	Input,
	Field,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
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
		<Card.Root>
			<Card.Body
				width="25.0625rem"
				height="40.6875rem"
				padding="0.625rem">
				<Box
					as="form"
					onSubmit={handleSubmit(onSubmit)}>
					<Grid gap="0.625rem">
						<Field.Root invalid={!!errors.date}>
							<Grid>
								<Flex alignItems="center">
									<Field.Label>Data</Field.Label>
								</Flex>

								<Controller
									name="date"
									control={control}
									render={({ field }) => (
										<DatePicker
											id="date"
											selected={field.value ? new Date(field.value) : null}
											onChange={(date: Date | null) => field.onChange(date?.toISOString())}
											customInput={
												<Input
													as={InputMask}
													mask="99/99/9999"
													placeholder="Selecione uma data"
												/>
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
									<Field.ErrorText>
										{errors.startTime.message}
									</Field.ErrorText>
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
					</Grid>

					<Flex justifyContent="flex-end">
						{!isEditing ? (
							<Button
								colorScheme="green"
								size="lg"
								type="submit"
								margin="0.625rem"
								>
								Cadastrar <LuPlus />
							</Button>
						) : (
							<Button
								colorScheme="blue"
								size="lg"
								type="submit"
								margin="0.625rem"
								>
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
			</Card.Body>
		</Card.Root>
	);
}
