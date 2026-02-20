import { Flex, Box } from "@chakra-ui/react";
import { FormDataCustomer } from "../../interface/FormDataCustomer";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import DynamicTable from "../../../../components/DynamicTable";

interface TableCustomerProps {
	customers: FormDataCustomer[];
	onEditClick: (serviceId: number) => void;
	onDeleteClick: (serviceId: number) => void;
}

export default function TableCustomer({
	customers,
	onEditClick,
	onDeleteClick,
}: TableCustomerProps) {
	return (
        <DynamicTable
			columns={[
				{
					key: "customerName",
					label: "Nome",
					hideOnMobile: false,
				},
				{
					key: "mobile",
					label: "Celular",
					hideOnMobile: true,
				},
			]}
			data={customers}
			actions={(row) => (
				<Flex>
					<Box _hover={{ color: "blue", cursor: "pointer" }} ><TbEdit onClick={() => onEditClick(row.id!)} fontSize="1.5rem" /></Box>
					<Box _hover={{ color: "red", cursor: "pointer" }} ><RiDeleteBin5Line onClick={() => onDeleteClick(row.id!)} fontSize="1.5rem" /></Box>
				</Flex>
			)}
		/>
    );
}
