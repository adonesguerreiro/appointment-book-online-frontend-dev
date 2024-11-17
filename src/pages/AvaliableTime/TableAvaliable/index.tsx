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
import { EditIcon } from "@chakra-ui/icons";

interface TableAvailableProps {
	availables: FormDataAvailableTime[];
	onEditClick: (available: number) => void;
}

export default function TableAvaliable({
	availables,
	onEditClick,
}: TableAvailableProps) {
	const dayMapping: { [key: string]: string } = {
		MONDAY: "Segunda-feira",
		TUESDAY: "Terça-feira",
		WEDNESDAY: "Quarta-feira",
		THURSDAY: "Quinta-feira",
		FRIDAY: "Sexta-feira",
		SATURDAY: "Sábado",
		SUNDAY: "Domingo",
	};

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
