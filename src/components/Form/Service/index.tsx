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
} from "@chakra-ui/react";
import { CurrencyInput } from "react-currency-mask";
import { Controller, useForm } from "react-hook-form";
import { LuPlusCircle } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";
import { FormDataService } from "../../../interface/FormDataService";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "../../../pages/Service/serviceSchema";
import InputMask from "react-input-mask";
import { useEffect } from "react";

interface ServiceFormProps {
	onSubmit: (data: FormDataService) => void;
	onCancel: () => void;
	isEditing: boolean;
	onEdit: (data: FormDataService) => void;
	selectedService?: FormDataService | null;
}

export default function ServiceForm({
	onSubmit,
	onCancel,
	isEditing,
	selectedService,
}: ServiceFormProps) {
	const {
		handleSubmit,
		register,
		reset,
		control,
		formState: { errors },
	} = useForm<FormDataService>({
		resolver: yupResolver(serviceSchema),
		defaultValues: { name: "", duration: "", price: 0 },
	});

	useEffect(() => {
		if (selectedService) {
			reset({
				name: selectedService.name,
				duration: selectedService.duration,
				price: Number(selectedService.price),
			});
		}
	}, [selectedService, reset]);

	return (
		<Card>
			<CardBody
				width="25.0625rem"
				height="40.6875rem"
				padding="0.625rem">
				<Box
					as="form"
					onSubmit={handleSubmit(onSubmit)}>
					<Grid gap="0.625rem">
						<FormControl isInvalid={!!errors.name}>
							<Grid>
								<FormLabel>Nome</FormLabel>
								<Input
									type="text"
									placeholder="Nome do serviço"
									id="name"
									{...register("name")}
								/>
								{errors.name && (
									<FormErrorMessage>{errors.name.message}</FormErrorMessage>
								)}
							</Grid>
						</FormControl>

						<FormControl isInvalid={!!errors.duration}>
							<Grid>
								<FormLabel>Duração</FormLabel>
								<Input
									as={InputMask}
									mask="99:99"
									placeholder="45:00"
									type="text"
									id="duration"
									{...register("duration")}
								/>
								{errors.duration && (
									<FormErrorMessage>{errors.duration.message}</FormErrorMessage>
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
										<CurrencyInput
											value={field.value}
											onChangeValue={(_, value) => {
												field.onChange(value);
											}}
											InputElement={
												<Input
													type="text"
													placeholder="R$ 100,00"
													id="price"
													maxLength={15}
													{...register("price")}
												/>
											}
										/>
									)}
								/>

								{errors.price && (
									<FormErrorMessage>{errors.price.message}</FormErrorMessage>
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
								rightIcon={<LuPlusCircle />}>
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
	);
}
