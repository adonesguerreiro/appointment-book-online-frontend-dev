import { Container, Flex, Spinner, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { availableTimeSchema } from "./availableTimeSchema";

import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";
import { useCallback, useEffect, useState } from "react";
import TableAvaliable from "./TableAvaliable";
import SectionHeader from "../../components/SectionHeader";
import AvailableTime from "../../components/Form/AvailableTime";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import { useHandleError } from "../../hooks/useHandleError";
import { CustomJwtPayload } from "../../interface/CustomJwtPayload";
import {
	createAvaliableTime,
	updateAvaliableTime,
	getAvaliableTimeById,
	getAvaliableTimes,
} from "../../services/api";
import { handleAuthError } from "../../utils/handleAuthError";
import RegisterButton from "../../components/RegisterButton";
import EmptyState from "../../components/EmptyState";

export default function AvaliableTimePage() {
	const { reset } = useForm<FormDataAvailableTime>({
		resolver: yupResolver(availableTimeSchema),
		defaultValues: { day: "", startTime: "", endTime: "", interval: 0 },
	});

	const [availableTime, setAvailableTime] = useState<FormDataAvailableTime[]>(
		[]
	);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [selectedAvailableTime, setSelectAvailableTime] =
		useState<FormDataAvailableTime | null>();
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate();

	const toast = useToast();
	const handleError = useHandleError();

	const { token, logout } = useAuth();

	const handleSubmitAvaliableTime = async (data: FormDataAvailableTime) => {
		try {
			if (token && !selectedAvailableTime) {
				const createdService = await createAvaliableTime(data);
				if (createdService.status === 200) {
					toast({
						title: "Horário disponível registrado com sucesso.",
						status: "success",
						duration: 3000,
						isClosable: true,
						position: "top-right",
					});
					fetchData();
					setShowForm(false);
				}
			} else {
				await updateAvaliableTime(Number(selectedAvailableTime?.id), data);
				toast({
					title: "Horário disponível alterado com sucesso.",
					status: "info",
					duration: 3000,
					isClosable: true,
					position: "top-right",
				});
				fetchData();
				setShowForm(false);
			}
		} catch (error) {
			console.error("Erro ao salvar dados", error);
			handleError(error);
		}
	};

	const handleEditAvaliableTime = async (avaliableTimeId: number) => {
		try {
			setIsEditing(true);
			const avaliableTimeData = await getAvaliableTimeById(avaliableTimeId);

			setSelectAvailableTime(avaliableTimeData.data);
			setShowForm(true);
		} catch (error) {
			console.error("Erro ao buscar dados", error);
		}
	};

	const handleCancel = () => {
		reset({
			day: "",
			startTime: "",
			endTime: "",
			interval: 0,
		});
		setShowForm(false);
		setIsEditing(false);
	};

	const fetchData = useCallback(async () => {
		if (!token) return;
		setLoading(true);

		try {
			const decoded = jwtDecode<CustomJwtPayload>(token);
			const companyId = decoded.id;
			const avaliableTimeData = await getAvaliableTimes(companyId);
			setAvailableTime(avaliableTimeData.data);
		} catch (error) {
			handleAuthError(error, logout, navigate);
			console.error("Erro ao buscar dados", error);
		} finally {
			setLoading(false);
		}
	}, [token, logout, navigate]);

	useEffect(() => {
		fetchData();
	}, [fetchData, token]);

	const handleNewClick = useCallback(() => {
		setSelectAvailableTime(null);
		setShowForm(true);
	}, []);

	const handleEditClick = useCallback((avaliableTimeId: number) => {
		handleEditAvaliableTime(avaliableTimeId);
	}, []);

	return loading ? (
		<Spinner />
	) : (
		<Container>
			<Flex
				display="flex"
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<SectionHeader title="Horário disponíveis" />

				{showForm ? (
					<AvailableTime
						onSubmit={handleSubmitAvaliableTime}
						onEdit={() =>
							handleEditAvaliableTime(Number(selectedAvailableTime))
						}
						onCancel={handleCancel}
						isEditing={isEditing}
						selectedAvailableTime={selectedAvailableTime}
					/>
				) : availableTime.length > 0 ? (
					<>
						<RegisterButton
							buttonText="Novo horário"
							onNewClick={handleNewClick}
						/>
						<TableAvaliable
							availables={availableTime}
							onEditClick={handleEditClick}
						/>
					</>
				) : (
					<>
						<RegisterButton
							buttonText="Novo horário"
							onNewClick={handleNewClick}
						/>
						<EmptyState />
					</>
				)}
			</Flex>
		</Container>
	);
}
