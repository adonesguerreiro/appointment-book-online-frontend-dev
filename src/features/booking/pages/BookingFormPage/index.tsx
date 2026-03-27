import {
	Container,
	Flex,
	Card,
	CardBody,
	Box,
	Button,
	Spinner,
} from "@chakra-ui/react";
import HeadingComponent from "../../../../shared/components/Heading";
import "react-calendar/dist/Calendar.css";
import TimeList from "../../components/TimeList";
import CustomCalendar from "../../../../shared/components/CustomCalendar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { bookAppointmentSchema } from "../../validators/bookAppointmentSchema";
import BookingAppointment from "../../components/Form";
import { useState } from "react";
import { FormDataUser } from "../../../users/interface/FormDataUser";
import EmptyState from "../../../../shared/components/EmptyState";
import { BookingAppointmentData } from "../../interface/BookingAppointmentData";
import { useParams } from "react-router-dom";
import { publicBookAppointment, publicGetCompany } from "../../services/api";
import { useCustomToast } from "@/shared/hooks/useCustomToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHandleError } from "@/shared/hooks/useHandleError";

export default function BookingFormPage() {
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

	const queryClient = useQueryClient();
	const handleError = useHandleError();
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const { showToast } = useCustomToast();
	const { slugCompany } = useParams();

	const {
		data: bookingData,
		isLoading,
		isRefetching,
	} = useQuery({
		queryKey: ["booking", selectedDate],
		queryFn: () =>
			slugCompany &&
			selectedDate &&
			publicGetCompany(slugCompany, selectedDate),
	});

	const mutation = useMutation({
		mutationFn: (data: BookingAppointmentData) => {
			if (!slugCompany) {
				throw new Error("Slug da empresa não encontrado.");
			}

			return publicBookAppointment(data, slugCompany);
		},
		onSuccess: async () => {
			showToast({
				title: "Agendamento realizado com sucesso.",
				status: "success",
			});
			queryClient.invalidateQueries({ queryKey: ["booking"] });
			reset({
				customerName: "",
				customerPhone: "",
				serviceId: "",
				calendar: new Date(),
				time: "",
			});
		},
		onError: (error) => {
			handleError(error);
		},
	});

	const handleSubmitBooking = (data: BookingAppointmentData) => {
		mutation.mutate(data);
	};

	return isLoading || isRefetching ? (
		<Spinner />
	) : (
		<Container w={{ base: "85%", md: "90%", lg: "800px" }}>
			<Flex
				display="flex"
				direction="column"
				align="center">
				<HeadingComponent title="Agendar horário" />
				<Card
					as="form"
					onSubmit={handleSubmit(handleSubmitBooking)}>
					<CardBody>
						{bookingData?.timeSlots.user.blocked ? (
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
									user={bookingData?.timeSlots.user || ({} as FormDataUser)}
									services={bookingData?.timeSlots.services || []}
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
											avaliableTimeSlot={
												bookingData?.timeSlots.avaliableTimeSlots || []
											}
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
