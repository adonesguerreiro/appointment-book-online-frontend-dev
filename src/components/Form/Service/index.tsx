import {
	Flex,
	Card,
	Box,
	Grid,
	Input,
	Button,
	Field,
} from "@chakra-ui/react";
import { CurrencyInput } from "react-currency-mask";
import { Controller, useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";
import { FormDataService } from "../../../interface/FormDataService";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceSchema } from "../../../validators/serviceSchema";
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
	});

	useEffect(() => {
		if (selectedService) {
			reset({
				serviceName: selectedService.serviceName,
				duration: selectedService.duration,
				price: Number(selectedService.price),
			});
		}
	}, [selectedService, reset]);

	return (
        <Card.Root>
            <Card.Body
				width="25.0625rem"
				height="40.6875rem"
				padding="0.625rem">
				<Box asChild><form onSubmit={handleSubmit(onSubmit)}>
                        <Grid gap="0.625rem">
                            <Field.Root invalid={!!errors.serviceName}>
                                <Grid>
                                    <Field.Label>Nome</Field.Label>
                                    <Input
                                        type="text"
                                        placeholder="Nome do serviço"
                                        id="serviceName"
                                        {...register("serviceName")}
                                    />
                                    {errors.serviceName && (
                                        <Field.ErrorText>
                                            {errors.serviceName.message}
                                        </Field.ErrorText>
                                    )}
                                </Grid>
                            </Field.Root>

                            <Field.Root invalid={!!errors.duration}>
                                <Grid>
                                    <Field.Label>Duração do serviço (minutos)</Field.Label>
                                    <Input {...register("duration")} asChild><InputMask
                                            mask="99:99"
                                            defaultValue={isEditing ? "duration" : ""}
                                            placeholder="45:00"
                                            type="text"
                                            id="duration" /></Input>
                                    {errors.duration && (
                                        <Field.ErrorText>{errors.duration.message}</Field.ErrorText>
                                    )}
                                </Grid>
                            </Field.Root>

                            <Field.Root invalid={!!errors.price}>
                                <Grid>
                                    <Field.Label>Preço</Field.Label>
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
                                        <Field.ErrorText>{errors.price.message}</Field.ErrorText>
                                    )}
                                </Grid>
                            </Field.Root>
                        </Grid>
                        <Flex justifyContent="flex-end">
                            {!isEditing ? (
                                <Button
                                    colorPalette="green"
                                    size="lg"
                                    type="submit"
                                    margin="0.625rem">
                                    Cadastrar <LuPlus />
                                </Button>
                            ) : (
                                <Button
                                    colorPalette="blue"
                                    size="lg"
                                    type="submit"
                                    margin="0.625rem">
                                    Editar <TbEditCircle />
                                </Button>
                            )}

                            <Button
                                colorPalette="gray"
                                size="lg"
                                margin="0.625rem"
                                onClick={onCancel}>
                                Cancelar <MdCancel />
                            </Button>
                        </Flex>
                    </form></Box>
			</Card.Body>
        </Card.Root>
    );
}
