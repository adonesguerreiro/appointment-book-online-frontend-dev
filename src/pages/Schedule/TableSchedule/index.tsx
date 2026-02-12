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
					key: "customerId",
					label: "Cliente",
					hideOnMobile: false,
				},
				{
					key: "serviceId",
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
				<Box _hover={{ color: "blue", cursor: "pointer" }} asChild><TbEdit onClick={() => onEditClick(row.id!)} fontSize="1.5rem" /></Box>
			)}
		/>
    );
}
