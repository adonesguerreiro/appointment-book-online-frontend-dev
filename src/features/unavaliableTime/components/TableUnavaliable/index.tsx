import { Flex, Box } from "@chakra-ui/react";
import { FormDataUnavailableTime } from "../../interface/FormDataUnavailableTime";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import DynamicTable from "../../../../components/DynamicTable";

interface TableUnavailableTimeProps {
	unavaliables: FormDataUnavailableTime[];
	onEditClick: (unavailableTimeId: number) => void;
	onDeleteClick: (unavailableTimeId: number) => void;
}

export default function TableUnavaliable({
	unavaliables,
	onEditClick,
	onDeleteClick,
}: TableUnavailableTimeProps) {
	return (
        <DynamicTable
			columns={[
				{
					key: "date",
					label: "Data",
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
			]}
			data={unavaliables.map((unavailable) => ({
				...unavailable,
				date: new Date(unavailable.date).toLocaleDateString("pt-BR"),
			}))}
			actions={(row) => (
				<Flex>
					<Box _hover={{ color: "blue", cursor: "pointer" }} ><TbEdit onClick={() => onEditClick(row.id!)} fontSize="1.5rem" /></Box>
					<Box _hover={{ color: "red", cursor: "pointer" }} ><RiDeleteBin5Line onClick={() => onDeleteClick(row.id!)} fontSize="1.5rem" /></Box>
				</Flex>
			)}
		/>
    );
}
