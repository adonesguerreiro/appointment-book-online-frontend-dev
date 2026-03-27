import RegisterButton from "@/shared/components/RegisterButton";
import { useNavigate } from "react-router-dom";
import TableCustomer from "../../components/TableCustomer";

export default function CustomerListPage() {
	const navigate = useNavigate();

	const handleNewClick = () => {
		navigate("/customer/new");
	};

	return (
		<>
			<RegisterButton
				buttonText="Novo cliente"
				onNewClick={handleNewClick}
			/>
			<TableCustomer />
		</>
	);
}
