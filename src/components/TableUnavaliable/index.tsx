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
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FormDataUnavaliable } from "../../interface/FormDataUnavaliable";

interface TableServiceProps {
	onNewClick: () => void;
}

export default function TableUnavaliable({ onNewClick }: TableServiceProps) {
	const [unavaliables, setUnavaliable] = useState<FormDataUnavaliable[]>([]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/unavailable")
			.then((response) => {
				setUnavaliable(response.data);
			})
			.catch((error) => {
				console.error("Error fetching unavaliables:", error);
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
					Nova indisponibilidade
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
									<Th>Ações</Th>
								</Tr>
							</Thead>
							<Tbody>
								{unavaliables.map((unavaliable, index) => (
									<Tr key={index}>
										<Td>{unavaliable.date}</Td>
										<Td>{unavaliable.startTime}</Td>
										<Td>{unavaliable.endTime}</Td>
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
