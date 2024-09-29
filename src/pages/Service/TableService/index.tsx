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
import { FormDataService } from "../../../interface/FormDataService";
import { FaPlus } from "react-icons/fa";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { currencyFormat } from "../../../helpers/currencyFormat";

interface TableServiceProps {
	services: FormDataService[];
	onNewClick: () => void;
	onEditClick: (serviceId: number) => void;
	onDeleteClick: (serviceId: number) => void;
}

export default function TableService({
	services,
	onNewClick,
	onEditClick,
	onDeleteClick,
}: TableServiceProps) {
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
					Novo serviço
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
										<Td>{service.duration}</Td>
										<Td isNumeric>{currencyFormat(Number(service.price))}</Td>
										<Td>
											<Flex>
												<EditIcon
													onClick={() => onEditClick(service.id!)}
													_hover={{ color: "blue", cursor: "pointer" }}
												/>
												<DeleteIcon
													onClick={() => onDeleteClick(service.id!)}
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
