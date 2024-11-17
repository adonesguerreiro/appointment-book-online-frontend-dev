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
import { FormDataCustomer } from "../../../interface/FormDataCustomer";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface TableCustomerProps {
	customers: FormDataCustomer[];
	onEditClick: (serviceId: number) => void;
	onDeleteClick: (serviceId: number) => void;
}

export default function TableService({
	customers,
	onEditClick,
	onDeleteClick,
}: TableCustomerProps) {
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
									<Th>Celular</Th>
									<Th>Ações</Th>
								</Tr>
							</Thead>
							<Tbody>
								{customers.map((customer, index) => (
									<Tr key={index}>
										<Td>{customer.customerName}</Td>
										<Td>{customer.mobile}</Td>
										<Td>
											<Flex>
												<EditIcon
													onClick={() => onEditClick(customer.id!)}
													_hover={{ color: "blue", cursor: "pointer" }}
												/>
												<DeleteIcon
													onClick={() => onDeleteClick(customer.id!)}
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
