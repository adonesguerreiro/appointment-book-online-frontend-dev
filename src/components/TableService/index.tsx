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
import { FormDataService } from "../../interface/FormDataService";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

interface TableServiceProps {
	onNewClick: () => void;
}

export default function TableService({ onNewClick }: TableServiceProps) {
	const [services, setServices] = useState<FormDataService[]>([]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/service")
			.then((response) => {
				setServices(response.data);
			})
			.catch((error) => {
				console.error("Error fetching services:", error);
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
										<Td>{service.name}</Td>
										<Td>{service.duration}</Td>
										<Td isNumeric>{service.price}</Td>
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
