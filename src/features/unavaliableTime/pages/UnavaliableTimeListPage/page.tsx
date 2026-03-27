import RegisterButton from "@/shared/components/RegisterButton";
import { useNavigate } from "react-router-dom";
import TableUnavaliable from "../../components/TableUnavaliable";

export default function UnavailableTimeListPage() {
	const navigate = useNavigate();

	const handleNewClick = () => {
		navigate("/unavaliable-time/new");
	};

	return (
		<>
			<RegisterButton
				buttonText="Novo horário indisponível"
				onNewClick={handleNewClick}
			/>
			<TableUnavaliable />
		</>
	);
}
