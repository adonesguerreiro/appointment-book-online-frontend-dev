import { Flex, Box } from "@chakra-ui/react";
import { FormDataService } from "../../../interface/FormDataService";
import { currencyFormat } from "../../../utils/currencyFormat";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { formatMinutesInHours } from "../../../utils/formatMinutesInHours";
import DynamicTable from "../../../components/DynamicTable";

interface TableServiceProps {
	services: FormDataService[];
	onNewClick: () => void;
	onEditClick: (serviceId: number) => void;
	onDeleteClick: (serviceId: number) => void;
}

export default function TableService({
	services,
	onEditClick,
	onDeleteClick,
}: TableServiceProps) {
	return (
		<DynamicTable
			columns={[
				{
					key: "serviceName",
					label: "Nome",
					hideOnMobile: false,
				},
				{
					key: "duration",
					label: "Duração",
					hideOnMobile: true,
					render: (value) => formatMinutesInHours(value as string),
				},
				{
					key: "price",
					label: "Preço",
					hideOnMobile: true,
					render: (value) => currencyFormat(value as number),
				},
			]}
			data={services}
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
