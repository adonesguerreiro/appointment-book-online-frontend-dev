import { Flex, Field, Card, Box, Grid, Input, Button } from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";
import { FormDataCustomer } from "../../../interface/FormDataCustomer";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import { useEffect } from "react";
import { customerSchema } from "../../../validators/customerSchema";

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
		<Card.Root>
			<Card.Body
				width="25.0625rem"
				height="40.6875rem"
				padding="0.625rem">
				<Box
					as="form"
					onSubmit={handleSubmit(onSubmit)}>
					<Grid gap="0.625rem">
						<Field.Root invalid={!!errors.customerName}>
							<Grid>
								<Field.Label>Nome</Field.Label>
								<Input
									type="text"
									placeholder="Nome do cliente"
									id="customerName"
									{...register("customerName")}
								/>
								{errors.customerName && (
									<Field.ErrorText>
										{errors.customerName.message}
									</Field.ErrorText>
								)}
							</Grid>
						</Field.Root>

						<Field.Root invalid={!!errors.mobile}>
							<Grid>
								<Field.Label>Celular</Field.Label>
								<Input
									as={InputMask}
									mask="(99) 99999-9999"
									defaultValue={isEditing ? "mobile" : ""}
									placeholder="(99) 99999-9999"
									type="tel"
									id="mobile"
									{...register("mobile")}
								/>
								{errors.mobile && (
									<Field.ErrorText>{errors.mobile.message}</Field.ErrorText>
								)}
							</Grid>
						</Field.Root>
					</Grid>
					<Flex justifyContent="flex-end">
						{!isEditing ? (
							<Button
								colorScheme="green"
								size="lg"
								type="submit"
								margin="0.625rem">
								Cadastrar <LuPlus />
							</Button>
						) : (
							<Button
								colorScheme="blue"
								size="lg"
								type="submit"
								margin="0.625rem">
								Editar <TbEditCircle />
							</Button>
						)}

						<Button
							colorScheme="gray"
							size="lg"
							margin="0.625rem"
							onClick={onCancel}>
							Cancelar <MdCancel />
						</Button>
					</Flex>
				</Box>
			</Card.Body>
		</Card.Root>
	);
}
