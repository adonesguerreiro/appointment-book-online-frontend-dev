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
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";

interface TableCustomerProps {
	customers: FormDataCustomer[];
	onEditClick: (serviceId: number) => void;
	onDeleteClick: (serviceId: number) => void;
}

export default function TableCustomer({
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
												<Box
													as={TbEdit}
													onClick={() => onEditClick(customer.id!)}
													_hover={{ color: "blue", cursor: "pointer" }}
													font-size="1.5rem"
												/>
												<Box
													as={RiDeleteBin5Line}
													onClick={() => onDeleteClick(customer.id!)}
													_hover={{ color: "red", cursor: "pointer" }}
													font-size="1.5rem"
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
