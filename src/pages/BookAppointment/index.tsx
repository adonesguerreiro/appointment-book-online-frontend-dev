import {
	Container,
	Flex,
	Card,
	CardBody,
	Box,
	Button,
	Spinner,
} from "@chakra-ui/react";
import HeadingComponent from "../../components/Heading";
import "react-calendar/dist/Calendar.css";
import TimeList from "../../components/TimeList";
import CustomCalendar from "../../components/CustomCalendar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { bookAppointmentSchema } from "../../validators/bookAppointmentSchema";
import BookingAppointment from "../../components/Form/BookAppointment";
import { useEffect } from "react";
import { AvaliableTimeSlot } from "../../interface/AvailableTimeSlot";
import { FormDataService } from "../../interface/FormDataService";
import { FormDataUser } from "../../interface/FormDataUser";
import { useBooking } from "../../hooks/Booking/useBooking";
import { useBookingSubmit } from "../../hooks/Booking/useBookingSubmit";
import EmptyState from "../../components/EmptyState";

export interface BookingAppointmentData {
	customerName: string;
	customerPhone: string;
	serviceId: string;
	calendar: Date;
	time: string;
}

export interface PublicCompany {
	avaliableTimeSlots: AvaliableTimeSlot[];
	services: FormDataService[];
	user: FormDataUser;
}

export default function BookingPage() {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isSubmitting },
		clearErrors,
	} = useForm<BookingAppointmentData>({
		resolver: yupResolver(bookAppointmentSchema),
		mode: "onChange",
	});

	const { fetchBooking, companyData, selectedDate, setSelectedDate, loading } =
		useBooking();

	const { handleSubmitBooking } = useBookingSubmit(reset, fetchBooking);

	useEffect(() => {
		fetchBooking();
	}, [fetchBooking]);

	return loading ? (
		<Spinner />
	) : (
		<Container
		w={{ base: "85%", md: "90%", lg: "800px" }}>
			<Flex
				display="flex"
				direction="column"
				align="center">
				<HeadingComponent title="Agendar horário" />
				<Card
					as="form"
					onSubmit={handleSubmit(handleSubmitBooking)}>
					<CardBody>
						{companyData?.user.blocked ? (
							<Flex
								justify="center"
								align="center"
								padding="1rem">
								<EmptyState />
							</Flex>
						) : (
							<>
								<BookingAppointment
									register={register}
									errors={errors}
									user={companyData?.user || {}}
									services={companyData?.services || []}
								/>
								<Card>
									<CardBody>
										<CustomCalendar
											setValue={setValue}
											register={register}
											errors={errors}
											clearErrors={clearErrors}
											selectedDate={selectedDate}
											setSelectedDate={setSelectedDate}
										/>
										<TimeList
											register={register}
											setValue={setValue}
											errors={errors}
											clearErrors={clearErrors}
											avaliableTimeSlot={companyData?.avaliableTimeSlots || []}
											isSubmitting={isSubmitting}
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
							</>
						)}
					</CardBody>
				</Card>
			</Flex>
		</Container>
	);
}
