import {
	Table,
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
					<Table.ScrollArea>
						<Table.Root
							colorScheme="gray">
							<Table.Header>
								<Table.Row>
									{columns.map((column) => (
										<Table.ColumnHeader
											key={column.key as string}
											display={
												column.hideOnMobile
													? { base: "none", md: "table-cell" }
													: "table-cell"
											}>
											{column.label}
										</Table.ColumnHeader>
									))}
									{actions && <Table.ColumnHeader>Ações</Table.ColumnHeader>}
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{data.map((row, index) => (
									<Table.Row key={index}>
										{columns.map((column) => (
											<Table.Cell
												key={column.key as string}
												display={
													column.hideOnMobile
														? { base: "none", md: "table-cell" }
														: "table-cell"
												}>
												{column.render
													? column.render(row[column.key] as string, row)
													: (row[column.key] as string)}
											</Table.Cell>
										))}
										{actions && <Table.Cell>{actions(row)}</Table.Cell>}
									</Table.Row>
								))}
							</Table.Body>
						</Table.Root>
					</Table.ScrollArea>
				</Box>
			</Flex>
		</>
	);
}
