import { useCallback } from "react";
import { getAvaliableTimeById } from "../../services/api";
import { FormDataAvailableTime } from "../../interface/FormDataAvailableTime";

interface useAvaliableTimeOpenModalDeleteProps {
	setSelectAvaliableTime: (avaliableTimeId: FormDataAvailableTime) => void;
	onOpen: () => void;
}

export const useAvaliableTimeOpenModalDelete = ({
	setSelectAvaliableTime,
	onOpen,
}: useAvaliableTimeOpenModalDeleteProps) => {
	const handleAvaliableTimeOpenDeleteModal = useCallback(
		async (avaliableTimeId: number) => {
			try {
				const avaliableTime = await getAvaliableTimeById(avaliableTimeId);
				setSelectAvaliableTime(avaliableTime.data);
				onOpen();
			} catch (error) {
				console.error("Erro ao obter os dados do horário disponível", error);
			}
		},
		[onOpen, setSelectAvaliableTime]
	);

	return {
		handleAvaliableTimeOpenDeleteModal,
	};
};
