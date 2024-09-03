import { Flex } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
	{ name: "Red", value: 400 },
	{ name: "Blue", value: 300 },
	{ name: "Green", value: 200 },
];

const COLORS = ["#FF6347", "#4682B4", "#32CD32"];

export default function DashboardPage() {
	return (
		<Flex
			direction="column"
			align="center"
			justify="center"
			borderRadius="md"
			minHeight="60vh">
			<PieChart
				width={400}
				height={400}>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					labelLine={false}
					outerRadius={150}
					fill="#8884d8"
					dataKey="value">
					{data.map((_, index) => (
						<Cell
							key={`cell-${index}`}
							fill={COLORS[index]}
						/>
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</Flex>
	);
}
