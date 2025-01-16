import { useCallback } from "react";
import { getUnavailableTimeById } from "../../services/api";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";

interface useUnavaliableTimeOpenModalDeleteProps {
	setSelectedUnavailableTime: (
		unavailableTime: FormDataUnavailableTime
	) => void;
	onOpen: () => void;
}

export const useUnavaliableTimeOpenModalDelete = ({
	setSelectedUnavailableTime,
	onOpen,
}: useUnavaliableTimeOpenModalDeleteProps) => {
	const handleUnavaliableTimeOpenModalDelete = useCallback(
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
		handleUnavaliableTimeOpenModalDelete,
	};
};
