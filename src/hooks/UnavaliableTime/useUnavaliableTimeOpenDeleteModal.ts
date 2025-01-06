import { useCallback } from "react";
import { getUnavailableTimeById } from "../../services/api";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";

interface useUnavaliableTimeOpenModal {
	setSelectedUnavailableTime: (
		unavailableTime: FormDataUnavailableTime
	) => void;
	onOpen: () => void;
}

export const useUnavaliableTimeOpenModal = ({
	setSelectedUnavailableTime,
	onOpen,
}: useUnavaliableTimeOpenModal) => {
	const handleUnavaliableTimeOpenModal = useCallback(
		async (unavailableTimeId: number) => {
			try {
				const unavailableTimeData = await getUnavailableTimeById(
					unavailableTimeId
				);
				setSelectedUnavailableTime(unavailableTimeData.data);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do horário disponível", error);
			}
		},
		[onOpen, setSelectedUnavailableTime]
	);

	return {
		handleUnavaliableTimeOpenModal,
	};
};
