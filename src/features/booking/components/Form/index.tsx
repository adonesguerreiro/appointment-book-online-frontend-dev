import {
	Flex,
	Avatar,
	Box,
	Text,
	Card,
	CardBody,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	Input,
	Spinner,
} from "@chakra-ui/react";
import {
	Control,
	Controller,
	FieldErrors,
	UseFormRegister,
} from "react-hook-form";
import { BookingAppointmentData } from "../../interface/BookingAppointmentData";
import InputMask from "@kerim-keskin/react-input-mask";
import { Select as SelectScroll } from "chakra-react-select";
import { useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { publicGetService, publicGetUser } from "../../services/api";

interface BookingAppointmentProps {
	register: UseFormRegister<BookingAppointmentData>;
	errors: FieldErrors<BookingAppointmentData>;
	control: Control<BookingAppointmentData>;
}

export default function BookingAppointment({
	errors,
	register,
	control,
}: BookingAppointmentProps) {
	const { slugCompany } = useParams();

	const { data: bookingUserData, isLoading: isLoadingUser } = useQuery({
		queryKey: ["bookingUser"],
		queryFn: () => slugCompany && publicGetUser(slugCompany),
	});

	const {
		data: bookingServiceData,
		isLoading: isLoadingService,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["bookingService"],
		queryFn: async ({ pageParam = 1 }) => {
			if (!slugCompany) {
				throw new Error("Slug da empresa não encontrado.");
			}
			const response = await publicGetService(slugCompany, pageParam);
			return response;
		},
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.currentPage < lastPage.totalPages
				? allPages.length + 1
				: undefined;
		},
		initialPageParam: 1,
	});

	const loadMoreServices = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	const services =
		bookingServiceData?.pages.flatMap((page) => page.services) ?? [];

	const serviceOptions = services.map((service) => ({
		value: service.id,
		label: service.serviceName,
	}));

	return (
		<>
			<Flex
				justify="center"
				align="center"
				padding="1rem">
				{isLoadingUser ? (
					<Spinner />
				) : (
					<>
						<Avatar
							src={
								typeof bookingUserData?.users[0]?.avatarUrl === "string"
									? bookingUserData?.users[0]?.avatarUrl
									: bookingUserData?.users[0]?.avatarUrl
										? URL.createObjectURL(bookingUserData?.users[0]?.avatarUrl)
										: undefined
							}
							size="xl"
						/>
						<Box ml="3">
							<Text fontWeight="bold">{bookingUserData?.users[0]?.name}</Text>
						</Box>
					</>
				)}
			</Flex>

			<Card
				padding={4}
				marginBottom={5}
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
					<FormControl isInvalid={!!errors.customerPhone}>
						<Grid>
							<FormLabel>Celular</FormLabel>
							<Input
								as={InputMask}
								mask="(99) 99999-9999"
								placeholder="(99) 99999-9999"
								type="tel"
								id="customerPhone"
								{...register("customerPhone")}
							/>
							{errors.customerPhone && (
								<FormErrorMessage>
									{errors.customerPhone.message}
								</FormErrorMessage>
							)}
						</Grid>
					</FormControl>
					<FormControl isInvalid={!!errors.serviceId}>
						<Grid>
							<FormLabel>Serviço</FormLabel>
							{isLoadingService ? (
								<Spinner />
							) : (
								<Controller
									control={control}
									name="serviceId"
									render={({ field }) => (
										<SelectScroll
											placeholder="Selecione o serviço"
											noOptionsMessage={() => "Nenhum serviço encontrado."}
											menuPortalTarget={document.body}
											styles={{
												menuPortal: (provided) => ({
													...provided,
													zIndex: 9999,
													padding: 0,
												}),
											}}
											{...field}
											options={serviceOptions}
											onChange={(option) => field.onChange(option?.value)}
											value={serviceOptions?.find(
												(option) => option.value === field.value,
											)}
											onMenuScrollToBottom={loadMoreServices}
										/>
									)}
								/>
							)}

							{errors.serviceId && (
								<FormErrorMessage>{errors.serviceId.message}</FormErrorMessage>
							)}
						</Grid>
					</FormControl>
				</CardBody>
			</Card>
		</>
	);
}
