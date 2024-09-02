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
import { FormDataSchedule } from "../../interface/FormDataSchedule";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

interface TableScheduleProps {
	onNewClick: () => void;
}

export default function TableService({ onNewClick }: TableScheduleProps) {
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
												<MdEdit />
												<MdDelete />
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
