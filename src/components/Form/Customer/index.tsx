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

import { useForm } from "react-hook-form";
import { LuPlusCircle } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";
import { FormDataCustomer } from "../../../interface/FormDataCustomer";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import { useEffect } from "react";
import { customerSchema } from "../../../pages/Customer/customerSchema";

interface CustomerFormProps {
	onSubmit: (data: FormDataCustomer) => void;
	onCancel: () => void;
	isEditing: boolean;
	onEdit: (data: FormDataCustomer) => void;
	selectedCustomer?: FormDataCustomer | null;
}

export default function CustomerForm({
	onSubmit,
	onCancel,
	isEditing,
	selectedCustomer,
}: CustomerFormProps) {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<FormDataCustomer>({
		resolver: yupResolver(customerSchema),
		defaultValues: { customerName: "", mobile: "" },
	});

	useEffect(() => {
		if (selectedCustomer) {
			reset({
				customerName: selectedCustomer.customerName,
				mobile: selectedCustomer.mobile,
			});
		}
	}, [selectedCustomer, reset]);

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
									<FormErrorMessage>{errors.mobile.message}</FormErrorMessage>
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
