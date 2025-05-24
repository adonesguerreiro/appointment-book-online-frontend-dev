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
import { publicBookAppointment, publicGetCompany } from "../../services/api";
import { useEffect, useState } from "react";
import { AvaliableTimeSlot } from "../../interface/AvailableTimeSlot";
import { FormDataService } from "../../interface/FormDataService";
import { FormDataUser } from "../../interface/FormDataUser";
import { useParams } from "react-router-dom";
import { useCustomToast } from "../../hooks/useCustomToast";

export interface BookingAppointmentData {
	customerName: string;
	customerPhone: string;
	serviceId: string;
	calendar: Date;
	time: string;
}

export interface PublicCompany {
	avaliableTimeSlot: AvaliableTimeSlot[];
	services: FormDataService[];
	users: FormDataUser[];
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

	const [companyData, setCompanyData] = useState<PublicCompany | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

	const { showToast } = useCustomToast();
	const { slugCompany } = useParams();
	const onSubmit = async (bookingData: BookingAppointmentData) => {
		try {
			const bookingCreated = await publicBookAppointment(
				bookingData,
				slugCompany!
			);
			if (bookingCreated.status === 200) {
				showToast({
					title: "Agendamento realizado com sucesso.",
					status: "success",
				});
			}
		} catch (error) {
			console.error("Erro ao agendar horário", error);
		}
	};

	console.log("Errors", errors);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (selectedDate) {
					const { data } = await publicGetCompany(slugCompany!, selectedDate!);
					setCompanyData(data.timeSlots);
				} else {
					const { data } = await publicGetCompany(slugCompany!);
					setCompanyData(data.timeSlots);
				}
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		};

		fetchData();
	}, [setCompanyData, companyData, selectedDate, slugCompany]);

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
							users={companyData?.users || []}
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
									avaliableTimeSlot={companyData?.avaliableTimeSlot || []}
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
