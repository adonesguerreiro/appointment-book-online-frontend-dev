import RegisterButton from "@/shared/components/RegisterButton";
import TableService from "../../components/TableService";
import { useNavigate } from "react-router-dom";

export default function ServiceListPage() {
	const navigate = useNavigate();

	const handleNewClick = () => {
		navigate("/service/new");
	};

	return (
		<>
			<RegisterButton
				buttonText="Novo serviço"
				onNewClick={handleNewClick}
			/>
			<TableService />
		</>
	);
}
