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
import { FormDataUnavailableTime } from "../../../interface/FormDataUnavailableTime";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface TableUnavailableTimeProps {
	unavailables: FormDataUnavailableTime[];
	onEditClick: (unavailableTimeId: number) => void;
	onDeleteClick: (unavailableTimeId: number) => void;
}

export default function TableUnavaliable({
	unavailables,
	onEditClick,
	onDeleteClick,
}: TableUnavailableTimeProps) {
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
									<Th>Data</Th>
									<Th>Horário ínicio</Th>
									<Th>Horário fim</Th>
									<Th>Ações</Th>
								</Tr>
							</Thead>
							<Tbody>
								{unavailables.map((unavaliable, index) => (
									<Tr key={index}>
										<Td>
											{unavaliable.date === null
												? "Não informado"
												: new Date(unavaliable.date!).toLocaleDateString(
														"pt-BR"
												  )}
										</Td>
										<Td>{unavaliable.startTime}</Td>
										<Td>{unavaliable.endTime}</Td>
										<Td>
											<Flex>
												<EditIcon
													onClick={() => onEditClick(unavaliable.id!)}
													_hover={{ color: "blue", cursor: "pointer" }}
												/>
												<DeleteIcon
													onClick={() => onDeleteClick(unavaliable.id!)}
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
