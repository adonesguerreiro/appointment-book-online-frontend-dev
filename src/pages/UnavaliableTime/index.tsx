import {
	Box,
	Button,
	Card,
	CardBody,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	Heading,
	Input,
	useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { unavaliableTimeSchema } from "./unavaliableTimeSchema";

import InputMask from "react-input-mask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FormDataUnavaliable } from "../../interface/FormDataUnavaliable";
import { useState } from "react";
import TableUnavaliable from "./TableUnavaliable";
import { MdCancel } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";

export default function UnavaliableTimePage() {
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = useForm<FormDataUnavaliable>({
		resolver: yupResolver(unavaliableTimeSchema),
	});

	const [showForm, setShowForm] = useState(false);

	const toast = useToast();

	const onSubmit = async () => {
		toast({
			title: "Horário indisponível registrado com sucesso.",
			status: "success",
			duration: 3000,
			isClosable: true,
			position: "top-right",
		});
		reset();
		setShowForm(false);
	};

	const onCancel = () => {
		reset();
		setShowForm(false);
	};

	return (
		<Container>
			<Flex
				display="flex"
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<Heading
					as="h1"
					size="lg"
					fontWeight="semibold">
					Horário indisponível
				</Heading>
				{showForm ? (
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
											<FormLabel>Data</FormLabel>

											<Controller
												name="date"
												control={control}
												render={({ field }) => (
													<DatePicker
														id="date"
														selected={
															field.value ? new Date(field.value) : null
														}
														onChange={(date) => field.onChange(date)}
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
												<FormErrorMessage>
													{errors.date.message}
												</FormErrorMessage>
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
												<FormErrorMessage>
													{errors.endTime.message}
												</FormErrorMessage>
											)}
										</Grid>
									</FormControl>
								</Grid>

								<Flex justifyContent="flex-end">
									<Button
										colorScheme="green"
										size="lg"
										type="submit"
										margin="0.625rem"
										rightIcon={<LuPlusCircle />}>
										Cadastrar
									</Button>
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
				) : (
					<TableUnavaliable
						onNewClick={function (): void {
							setShowForm(true);
						}}
					/>
				)}
			</Flex>
		</Container>
	);
}
