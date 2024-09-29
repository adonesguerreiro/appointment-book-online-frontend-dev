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
import { FormDataCustomer } from "../../../interface/FormDataCustomer";
import { FaPlus } from "react-icons/fa";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface TableCustomerProps {
	customers: FormDataCustomer[];
	onNewClick: () => void;
	onEditClick: (serviceId: number) => void;
	onDeleteClick: (serviceId: number) => void;
}

export default function TableService({
	customers,
	onNewClick,
	onEditClick,
	onDeleteClick,
}: TableCustomerProps) {
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
					Novo cliente
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
