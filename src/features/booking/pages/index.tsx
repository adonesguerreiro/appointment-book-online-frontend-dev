import {
	Container,
	Flex,
	Card,
	CardBody,
	Box,
	Button,
	Spinner,
} from "@chakra-ui/react";
import HeadingComponent from "../../../shared/components/Heading";
import "react-calendar/dist/Calendar.css";
import TimeList from "../components/TimeList";
import CustomCalendar from "../../../shared/components/CustomCalendar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { bookAppointmentSchema } from "../validators/bookAppointmentSchema";
import BookingAppointment from "../components/Form";
import { useCallback, useEffect, useState } from "react";
import { FormDataUser } from "../../users/interface/FormDataUser";
import EmptyState from "../../../shared/components/EmptyState";
import { BookingAppointmentData } from "../interface/BookingAppointmentData";
import { useLoading } from "@/shared/hooks/useLoading";
import { useParams } from "react-router-dom";
import { PublicCompany } from "../interface/PublicCompany";
import { publicBookAppointment, publicGetCompany } from "../services/api";
import { useCustomToast } from "@/shared/hooks/useCustomToast";

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

		const [companyData, setCompanyData] = useState<PublicCompany | null>(null);
		const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
		const { loading, startLoading, stopLoading } = useLoading();
		const { showToast } = useCustomToast();
		const { slugCompany } = useParams();
		const fetchBooking = useCallback(async () => {
			try {
				startLoading();

				if (selectedDate) {
					const { data } = await publicGetCompany(slugCompany!, selectedDate);
					setCompanyData(data.timeSlots);
				} else {
					const { data } = await publicGetCompany(slugCompany!);
					setCompanyData(data.timeSlots);
				}
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			} finally {
				stopLoading();
			}
		}, [slugCompany, selectedDate, startLoading, stopLoading]);

	const handleSubmitBooking = useCallback(
		async (bookingData: BookingAppointmentData) => {
			try {
				if(!slugCompany){
					return;
				}

				const bookingCreated = await publicBookAppointment(
					bookingData,
					slugCompany
				);
				if (bookingCreated.status === 200) {
					showToast({
						title: "Agendamento realizado com sucesso.",
						status: "success",
					});
					await fetchBooking();
					reset({
						customerName: "",
						customerPhone: "",
						serviceId: "",
						calendar: new Date(),
						time: "",
					});
				}
			} catch (error) {
				console.error("Erro ao agendar horário", error);
			}
		},
		[fetchBooking, reset, showToast, slugCompany]
	);


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
									user={companyData?.user || {} as FormDataUser}
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
