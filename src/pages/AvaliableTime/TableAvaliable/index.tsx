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
} from "@chakra-ui/react";
import { FormDataAvailableTime } from "../../../interface/FormDataAvailableTime";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { dayMapping } from "../../../utils/dayMapping";

interface TableAvailableProps {
	availables: FormDataAvailableTime[];
	onEditClick: (available: number) => void;
	onDeleteClick: (available: number) => void;
}

export default function TableAvaliable({
	availables,
	onEditClick,
	onDeleteClick,
}: TableAvailableProps) {
	const periodMapping: { [key: string]: string } = {
		MORNING: "Manhã",
		AFTERNOON: "Tarde",
		EVENING: "Noite",
	};

	return (
		<>
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
									<Th>Dia</Th>
									<Th>Período</Th>
									<Th>Horário ínicio</Th>
									<Th>Horário fim</Th>
									<Th>Intervalo</Th>
									<Th>Ações</Th>
								</Tr>
							</Thead>
							<Tbody>
								{availables.map((available, index) => (
									<Tr key={index}>
										<Td>{dayMapping[available.day]}</Td>
										<Td>{periodMapping[available.period!]}</Td>
										<Td>{available.startTime}</Td>
										<Td>{available.endTime}</Td>
										<Td>{available.interval} min</Td>

										<Td>
											<Flex>
												<EditIcon
													onClick={() => onEditClick(available.id!)}
													_hover={{ color: "blue", cursor: "pointer" }}
												/>
												<DeleteIcon
													onClick={() => onDeleteClick(available.id!)}
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
