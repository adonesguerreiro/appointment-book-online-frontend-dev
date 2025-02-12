import { useCallback } from "react";
import { FormDataDashboard } from "../../interface/FormDataDashboard";
import { getDashboard } from "../../services/api";
import { useAuth } from "../useAuth";
import { useCustomToast } from "../useCustomToast";
import { useHandleError } from "../useHandleError";

interface UsePieCharSubmit {
	fetchDataPieChart: (month: string, year: string) => Promise<void>;
}

export const usePieCharSubmit = ({ fetchDataPieChart }: UsePieCharSubmit) => {
	const { token, logout } = useAuth();
	const { showToast } = useCustomToast();
	const handleError = useHandleError();

	const handleSubmitPieChart = useCallback(
		async (data: FormDataDashboard) => {
			try {
				if (!token) {
					logout();
					return;
				}
				const filterScheduleByStatus = await getDashboard(
					data.month,
					data.year
				);

				if (filterScheduleByStatus.status === 200) {
					showToast({
						title: "Filtro aplicado com sucesso.",
						status: "success",
					});
				}

				fetchDataPieChart(data.month, data.year);
			} catch (error) {
				handleError(error);
			}
		},
		[fetchDataPieChart, handleError, logout, showToast, token]
	);

	return { handleSubmitPieChart };
};
