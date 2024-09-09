import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Flex,
	Box,
	Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FormDataSchedule } from "../../../interface/FormDataSchedule";
import { FaPlus } from "react-icons/fa";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface TableScheduleProps {
	onNewClick: () => void;
	onEditClick: () => void;
	openModal: () => void;
}
export default function TableSchedule({
	onNewClick,
	onEditClick,
	openModal,
}: TableScheduleProps) {
	const [schedules, setSchedules] = useState<FormDataSchedule[]>([]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/schedule")
			.then((response) => {
				setSchedules(response.data);
			})
			.catch((error) => {
				console.error("Error fetching schedules:", error);
			});
	});

	return (
		<>
			<Box
				padding="0.625rem"
				marginLeft="100%">
				<Button
					colorScheme="teal"
					size="lg"
					rightIcon={<FaPlus />}
					onClick={onNewClick}>
					Nova agenda
				</Button>
			</Box>
			<Flex
				direction="column"
				align="center"
				justify="center"
				gap="10"
				padding="0.625rem">
				<Box width="60.5625rem">
					<TableContainer>
						<Table
							variant="striped"
							colorScheme="gray">
							<Thead>
								<Tr>
									<Th>Cliente</Th>
									<Th>Serviço</Th>
									<Th>Data</Th>
									<Th>Horário</Th>
									<Th>Ações</Th>
								</Tr>
							</Thead>
							<Tbody>
								{schedules.map((schedule, index) => (
									<Tr key={index}>
										<Td>{schedule.customerId}</Td>
										<Td>{schedule.serviceId}</Td>
										<Td>{schedule.status}</Td>
										<Td>{schedule.date}</Td>
										<Td>
											<Flex>
												<EditIcon
													onClick={onEditClick}
													_hover={{ color: "blue", cursor: "pointer" }}
												/>
												<DeleteIcon
													onClick={openModal}
													_hover={{ color: "red", cursor: "pointer" }}
												/>
											</Flex>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			</Flex>
		</>
	);
}
