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
import { FormDataSchedule } from "../../../interface/FormDataSchedule";
import { FaPlus } from "react-icons/fa";
import { EditIcon } from "@chakra-ui/icons";
import { formatDate } from "../../../utils/formatDate";

interface TableScheduleProps {
	schedules: FormDataSchedule[];
	onNewClick: () => void;
	onEditClick: (scheduleId: number) => void;
}
export default function TableSchedule({
	schedules,
	onNewClick,
	onEditClick,
}: TableScheduleProps) {
	const statusMapping: { [key: string]: string } = {
		SCHEDULED: "Agendado",
		CANCELLED: "Cancelado",
		ATTENDED: "Atendido",
	};

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
										<Td>{schedule.customerName}</Td>
										<Td>{schedule.serviceName}</Td>
										<Td>{formatDate(schedule.date)}</Td>
										<Td>{statusMapping[schedule.status]}</Td>
										<Td>
											<Flex>
												<EditIcon
													onClick={() => onEditClick(schedule.id!)}
													_hover={{ color: "blue", cursor: "pointer" }}
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
