import { useCallback, useState } from "react";
import { getDashboard } from "../../services/api";
import { statusMapping } from "../../utils/statusMapping";
import { useAuth } from "../useAuth";

export const usePieChart = () => {
	const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
		[]
	);

	const { token, logout } = useAuth();
	const fetchDataPieChart = useCallback(
		async (month: string, year: string) => {
			if (!token) {
				logout();
				return;
			}

			try {
				const { data } = await getDashboard(month, year);
				if (data.scheduleByStatus.length === 0) return;

				const transformedData = data.scheduleByStatus.map(
					(item: { status: string; _count: { status: number } }) => ({
						name: statusMapping[item.status],
						value: item._count.status,
					})
				);

				setChartData(transformedData);
			} catch (error) {
				console.error("Erro ao buscar os dados do dashboard:", error);
			}
		},
		[logout, token]
	);

	return { fetchDataPieChart, setChartData, chartData, token };
};
