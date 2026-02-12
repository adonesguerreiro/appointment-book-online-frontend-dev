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

interface ColumnConfig<T> {
	label: string;
	key: keyof T;
	hideOnMobile?: boolean;
	render?: (value: string | number, row: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
	columns: ColumnConfig<T>[];
	data: T[];
	actions?: (row: T) => React.ReactNode;
}

export default function DynamicTable<T extends object>({
	columns,
	data,
	actions,
}: DynamicTableProps<T>) {
	return (
		<>
			<Flex
				direction="column"
				alignItems={{ base: "flex-start", md: "center", lg: "center" }}
				justifyContent={{ base: "flex-start", md: "center", lg: "center" }}>
				<Box width="full">
					<TableContainer>
						<Table
							variant="striped"
							colorScheme="gray">
							<Thead>
								<Tr>
									{columns.map((column) => (
										<Th
											key={column.key as string}
											display={
												column.hideOnMobile
													? { base: "none", md: "table-cell" }
													: "table-cell"
											}>
											{column.label}
										</Th>
									))}
									{actions && <Th>Ações</Th>}
								</Tr>
							</Thead>
							<Tbody>
								{data.map((row, index) => (
									<Tr key={index}>
										{columns.map((column) => (
											<Td
												key={column.key as string}
												display={
													column.hideOnMobile
														? { base: "none", md: "table-cell" }
														: "table-cell"
												}>
												{column.render
													? column.render(row[column.key] as string, row)
													: (row[column.key] as string)}
											</Td>
										))}
										{actions && <Td>{actions(row)}</Td>}
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
