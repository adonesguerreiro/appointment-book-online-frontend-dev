import { Container, Flex, Card, CardBody, Box, Button } from "@chakra-ui/react";
import HeadingComponent from "../../components/Heading";
import "react-calendar/dist/Calendar.css";
import TimeList from "../../components/TimeList";
import CustomCalendar from "../../components/CustomCalendar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { bookAppointmentSchema } from "../../validators/bookAppointmentSchema";
import BookingAppointment from "../../components/Form/BookAppointment";

export interface BookingAppointmentData {
	customerName: string;
	mobile: string;
	serviceName: string;
	calendar: Date;
	time: string;
}

export default function BookingPage() {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		clearErrors,
	} = useForm<BookingAppointmentData>({
		resolver: yupResolver(bookAppointmentSchema),
		mode: "onChange",
	});

	const onSubmit = async (data: BookingAppointmentData) => {
		console.log(data);
	};

	return (
		<Container>
			<Flex
				display="flex"
				direction="column"
				align="center"
				gap="10"
				padding="0.625rem">
				<HeadingComponent title="Agendar horário" />
				<Card
					as="form"
					onSubmit={handleSubmit(onSubmit)}>
					<CardBody
						width="52.5625rem"
						padding="1rem">
						<BookingAppointment
							register={register}
							errors={errors}
						/>
						<Card>
							<CardBody>
								<CustomCalendar
									setValue={setValue}
									register={register}
									errors={errors}
									clearErrors={clearErrors}
								/>
								<TimeList
								register={register}
									setValue={setValue}
									errors={errors}
									clearErrors={clearErrors}
								/>
							</CardBody>
						</Card>

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
