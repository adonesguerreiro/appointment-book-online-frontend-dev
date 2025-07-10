import { Box } from "@chakra-ui/react";
import { FormDataSchedule } from "../../../interface/FormDataSchedule";
import { formatDate } from "../../../utils/formatDate";
import { statusMapping } from "../../../utils/statusMapping";
import { TbEdit } from "react-icons/tb";
import DynamicTable from "../../../components/DynamicTable";

interface TableScheduleProps {
	schedules: FormDataSchedule[];
	onEditClick: (scheduleId: number) => void;
}

export default function TableSchedule({
	schedules,
	onEditClick,
}: TableScheduleProps) {
	return (
		<DynamicTable
			columns={[
				{
					key: "customerName",
					label: "Cliente",
					hideOnMobile: false,
				},
				{
					key: "serviceName",
					label: "Serviço",
					hideOnMobile: true,
				},
				{
					key: "date",
					label: "Data",
					render: (value) => formatDate(value as string),
					hideOnMobile: false,
				},
				{
					key: "status",
					label: "Status",
					render: (value) => statusMapping[value as string],
					hideOnMobile: true,
				},
			]}
			data={schedules}
			actions={(row) => (
				<Box
					as={TbEdit}
					onClick={() => onEditClick(row.id!)}
					_hover={{ color: "blue", cursor: "pointer" }}
					fontSize="1.5rem"
				/>
			)}
		/>
	);
}
