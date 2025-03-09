import {
	Container,
	Flex,
	Card,
	CardBody,
	Avatar,
	Box,
	Text,
	FormErrorMessage,
	FormLabel,
	Grid,
	Input,
	FormControl,
	Select,
	Button,
} from "@chakra-ui/react";
import HeadingComponent from "../../components/Heading";
import "react-calendar/dist/Calendar.css";
import TimeList from "../../components/TimeList";
import CustomCalendar from "../../components/CustomCalendar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import InputMask from "react-input-mask";
import * as yup from "yup";
import { FaCheckCircle } from "react-icons/fa";

export interface BookingData {
	customerName: string;
	mobile: string;
	serviceName: string;
	serviceId: string;
}

export default function BookingPage() {
	const {
		register,
		formState: { errors },
	} = useForm<BookingData>({
		resolver: yupResolver(
			yup.object({
				customerName: yup.string().required("Nome é obrigatório"),
				mobile: yup.string().required("Celular é obrigatório"),
				serviceName: yup.string().required("Serviço é obrigatório"),
				serviceId: yup.string().required("Serviço é obrigatório"),
			})
		),
	});

	const services = [
		{ id: "1", serviceName: "Consulta" },
		{ id: "2", serviceName: "Exame" },
		{ id: "3", serviceName: "Curso" },
		{ id: "4", serviceName: "Palestra" },
		{ id: "5", serviceName: "Treinamento" },
		{ id: "6", serviceName: "Workshop" },
		{ id: "7", serviceName: "Outro" },
	];

	return (
		<Container>
			<Flex
				display="flex"
				direction="column"
				align="center"
				gap="10"
				padding="0.625rem">
				<HeadingComponent title="Agendar horário" />
				<Card>
					<CardBody
						width="52.5625rem"
						padding="1rem">
						<Flex
							justify="center"
							align="center"
							padding="1rem">
							<Avatar
								src="https://bit.ly/sage-adebayo"
								size="xl"
							/>
							<Box ml="3">
								<Text fontWeight="bold">Segun Adebayo</Text>
							</Box>
						</Flex>
						<Card
							padding={4}
							marginBottom={4}
							width="25rem"
							mx="auto">
							<CardBody>
								<FormControl isInvalid={!!errors.customerName}>
									<Grid>
										<FormLabel>Nome</FormLabel>
										<Input
											type="text"
											placeholder="Nome do cliente"
											id="customerName"
											{...register("customerName")}
										/>
										{errors.customerName && (
											<FormErrorMessage>
												{errors.customerName.message}
											</FormErrorMessage>
										)}
									</Grid>
								</FormControl>
								<FormControl isInvalid={!!errors.mobile}>
									<Grid>
										<FormLabel>Celular</FormLabel>
										<Input
											as={InputMask}
											mask="(99) 99999-9999"
											placeholder="(99) 99999-9999"
											type="tel"
											id="mobile"
											{...register("mobile")}
										/>
										{errors.mobile && (
											<FormErrorMessage>
												{errors.mobile.message}
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
											{services.map((service) => (
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
							</CardBody>
						</Card>
						<CustomCalendar />
						<TimeList />
						<Box
							textAlign="right"
							paddingTop="1rem">
							<Button
								colorScheme="teal"
								size="lg"
								type="submit"
								margin="0.5rem"
								rightIcon={<FaCheckCircle />}>
								Agendar consulta
							</Button>
						</Box>
					</CardBody>
				</Card>
			</Flex>
		</Container>
	);
}
