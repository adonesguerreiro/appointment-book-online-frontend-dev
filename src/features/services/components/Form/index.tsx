import {
	Flex,
	Card,
	CardBody,
	Box,
	Grid,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
	Container,
	Spinner,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";
import { FormDataService } from "../../interface/FormDataService";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "../../validators/serviceSchema";
import InputMask from "@kerim-keskin/react-input-mask";
import { NumericFormat } from "react-number-format";
import SectionHeader from "@/shared/components/SectionHeader";
import { useEffect } from "react";
import { minutesToTime } from "@/utils/minutesToTime";

interface ServiceFormProps {
	onSubmit: (data: FormDataService) => void;
	onCancel: () => void;
	isEditing: boolean;
	onEdit: (data: FormDataService) => void;
	selectedService?: FormDataService | null;
	isLoading: boolean;
}

export default function ServiceForm({
	onSubmit,
	onCancel,
	isEditing,
	selectedService,
	isLoading,
}: ServiceFormProps) {
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
		reset,
	} = useForm<FormDataService>({
		resolver: yupResolver(serviceSchema),
		defaultValues: {
			serviceName: "",
		},
	});

	useEffect(() => {
		if (selectedService) {
			const { duration, ...rest } = selectedService;
			const formattedDuration = minutesToTime(Number(duration));
			const serviceData = {
				...rest,
				duration: formattedDuration,
			};
			reset(serviceData);
		}
	}, [selectedService, reset]);

	return (
		<Container>
			<Flex
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<SectionHeader title="Serviço" />
				{isLoading ? (
					<Spinner />
				) : (
					<Card>
						<CardBody
							width="25.0625rem"
							height="40.6875rem"
							padding="0.625rem">
							<Box
								as="form"
								onSubmit={handleSubmit(onSubmit)}>
								<Grid gap="0.625rem">
									<FormControl isInvalid={!!errors.serviceName}>
										<Grid>
											<FormLabel>Nome</FormLabel>
											<Input
												type="text"
												placeholder="Nome do serviço"
												id="serviceName"
												{...register("serviceName")}
											/>
											{errors.serviceName && (
												<FormErrorMessage>
													{errors.serviceName.message}
												</FormErrorMessage>
											)}
										</Grid>
									</FormControl>

									<FormControl isInvalid={!!errors.duration}>
										<Grid>
											<FormLabel>
												Duração do serviço (horas e minutos)
											</FormLabel>
											<Input
												as={InputMask}
												mask="99:99"
												defaultValue={isEditing ? "duration" : ""}
												placeholder="45:00"
												type="text"
												id="duration"
												{...register("duration")}
											/>
											{errors.duration && (
												<FormErrorMessage>
													{errors.duration.message}
												</FormErrorMessage>
											)}
										</Grid>
									</FormControl>

									<FormControl isInvalid={!!errors.price}>
										<Grid>
											<FormLabel>Preço</FormLabel>
											<Controller
												name="price"
												control={control}
												render={({ field }) => (
													<NumericFormat
														customInput={Input}
														thousandSeparator="."
														decimalSeparator=","
														prefix="R$ "
														decimalScale={2}
														fixedDecimalScale
														value={field.value}
														onValueChange={(values) => {
															field.onChange(values.floatValue);
														}}
													/>
												)}
											/>

											{errors.price && (
												<FormErrorMessage>
													{errors.price.message}
												</FormErrorMessage>
											)}
										</Grid>
									</FormControl>
								</Grid>
								<Flex justifyContent="flex-end">
									{!isEditing ? (
										<Button
											colorScheme="green"
											size="lg"
											type="submit"
											margin="0.625rem"
											rightIcon={<LuPlus />}>
											Cadastrar
										</Button>
									) : (
										<Button
											colorScheme="blue"
											size="lg"
											type="submit"
											margin="0.625rem"
											rightIcon={<TbEditCircle />}>
											Editar
										</Button>
									)}

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
				)}
			</Flex>
		</Container>
	);
}
