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
import { FormDataService } from "../../../interface/FormDataService";
import { currencyFormat } from "../../../utils/currencyFormat";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { formatMinutesInHours } from "../../../utils/formatMinutesInHours";

interface TableServiceProps {
	services: FormDataService[];
	onNewClick: () => void;
	onEditClick: (serviceId: number) => void;
	onDeleteClick: (serviceId: number) => void;
}

export default function TableService({
	services,
	onEditClick,
	onDeleteClick,
}: TableServiceProps) {
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
									<Th>Nome</Th>
									<Th>Duração</Th>
									<Th isNumeric>Preço</Th>
									<Th>Ações</Th>
								</Tr>
							</Thead>
							<Tbody>
								{services.map((service, index) => (
									<Tr key={index}>
										<Td>{service.serviceName}</Td>
										<Td>{formatMinutesInHours(service.duration)}</Td>
										<Td isNumeric>{currencyFormat(service.price)}</Td>
										<Td>
											<Flex>
												<Box
													as={TbEdit}
													onClick={() => onEditClick(service.id!)}
													_hover={{ color: "blue", cursor: "pointer" }}
													fontSize="1.5rem"
												/>
												<Box
													as={RiDeleteBin5Line}
													onClick={() => onDeleteClick(service.id!)}
													_hover={{ color: "red", cursor: "pointer" }}
													fontSize="1.5rem"
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
