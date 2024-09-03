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
import { FormDataAvaliable } from "../../../interface/FormDataAvaliable";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

interface TableServiceProps {
	onNewClick: () => void;
}

export default function TableAvaliable({ onNewClick }: TableServiceProps) {
	const [avaliables, setAvaliable] = useState<FormDataAvaliable[]>([]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/avaliable")
			.then((response) => {
				setAvaliable(response.data);
			})
			.catch((error) => {
				console.error("Error fetching avaliables:", error);
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
					Novo horário
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
									<Th>Dia</Th>
									<Th>Horário ínicio</Th>
									<Th>Horário fim</Th>
									<Th>Intervalo</Th>
									<Th>Ações</Th>
								</Tr>
							</Thead>
							<Tbody>
								{avaliables.map((avaliable, index) => (
									<Tr key={index}>
										<Td>{avaliable.day}</Td>
										<Td>{avaliable.startTime}</Td>
										<Td>{avaliable.endTime}</Td>
										<Td>{avaliable.interval} min</Td>

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
