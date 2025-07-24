import { Flex, Box } from "@chakra-ui/react";
import { FormDataAvailableTime } from "../../../interface/FormDataAvailableTime";
import { dayMapping } from "../../../utils/dayMapping";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import DynamicTable from "../../../components/DynamicTable";

interface TableAvailableProps {
	availables: FormDataAvailableTime[];
	onEditClick: (available: number) => void;
	onDeleteClick: (available: number) => void;
}

export default function TableAvaliable({
	availables,
	onEditClick,
	onDeleteClick,
}: TableAvailableProps) {
	const periodMapping: { [key: string]: string } = {
		MORNING: "Manhã",
		AFTERNOON: "Tarde",
		EVENING: "Noite",
	};

	return (
		<DynamicTable
			columns={[
				{
					key: "day",
					label: "Dia",
					hideOnMobile: false,
				},
				{
					key: "period",
					label: "Período",
					hideOnMobile: false,
				},
				{
					key: "startTime",
					label: "Horário ínicio",
					hideOnMobile: true,
				},
				{
					key: "endTime",
					label: "Horário fim",
					hideOnMobile: true,
				},
				{
					key: "interval",
					label: "Intervalo",
					hideOnMobile: true,
				},
			]}
			data={availables.map((available) => ({
				...available,
				day: dayMapping[available.day],
				period: periodMapping[available.period],
			}))}
			actions={(row) => (
				<Flex>
					<Box
						as={TbEdit}
						onClick={() => onEditClick(row.id!)}
						_hover={{ color: "blue", cursor: "pointer" }}
						fontSize="1.5rem"
					/>
					<Box
						as={RiDeleteBin5Line}
						onClick={() => onDeleteClick(row.id!)}
						_hover={{ color: "red", cursor: "pointer" }}
						fontSize="1.5rem"
					/>
				</Flex>
			)}
		/>
	);
}
