import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

interface PieChartDashboardProps {
	chartData: { name: string; value: number }[];
}
export default function PieChartDashboard({
	chartData,
}: PieChartDashboardProps) {
	const COLORS = ["#4682B4", "#FF6347", "#32CD32"];

	return (
		<PieChart
			width={400}
			height={400}>
			<Pie
				data={chartData}
				cx="50%"
				cy="50%"
				labelLine={false}
				outerRadius={150}
				fill="#8884d8"
				dataKey="value">
				{chartData.map((_, index) => (
					<Cell
						key={`cell-${index}`}
						fill={COLORS[index % COLORS.length]}
					/>
				))}
			</Pie>
			<Tooltip />
			<Legend />
		</PieChart>
	);
}
