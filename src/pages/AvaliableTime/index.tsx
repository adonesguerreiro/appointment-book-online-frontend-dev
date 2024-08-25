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
	Select,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { avaliableTimeSchema } from "./avaliableTimeSchema";
import { AiOutlinePlus } from "react-icons/ai";
import InputMask from "react-input-mask";

import { FormDataAvaliable } from "../../interface/FormDataAvaliable";

export default function AvaliableTimePage() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormDataAvaliable>({
		resolver: yupResolver(avaliableTimeSchema),
	});

	const toast = useToast();

	const onSubmit = async () => {
		toast({
			title: "Horário disponível registrado com sucesso.",
			status: "success",
			duration: 3000,
			isClosable: true,
			position: "top-right",
		});
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
					Horário disponível
				</Heading>
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
											<FormErrorMessage>
												{errors.interval.message}
											</FormErrorMessage>
										)}
									</Grid>
								</FormControl>
							</Grid>

							<Button
								colorScheme="green"
								size="lg"
								type="submit"
								margin="0.625rem"
								rightIcon={<AiOutlinePlus />}>
								Cadastrar
							</Button>
						</Box>
					</CardBody>
				</Card>
			</Flex>
		</Container>
	);
}
