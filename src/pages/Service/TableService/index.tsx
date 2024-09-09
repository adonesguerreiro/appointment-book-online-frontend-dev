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
import { useEffect, useState } from "react";
import { FormDataService } from "../../../interface/FormDataService";
import { FaPlus } from "react-icons/fa";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { getServices } from "../../../services/api";

interface TableServiceProps {
	onNewClick: () => void;
	onEditClick: () => void;
	openModal: () => void;
}

export default function TableService({
	onNewClick,
	onEditClick,
	openModal,
}: TableServiceProps) {
	const [services, setServices] = useState<FormDataService[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getServices();
				setServices(response.data);
			} catch (error) {
				console.error("Erro ao buscar dados", error);
			}
		};

		fetchData();
	}, []);
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
												<EditIcon
													onClick={onEditClick}
													_hover={{ color: "blue", cursor: "pointer" }}
												/>
												<DeleteIcon
													onClick={openModal}
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
