import RegisterButton from "@/shared/components/RegisterButton";
import TableAvaliable from "../../components/TableAvaliable";
import { useNavigate } from "react-router-dom";

export default function AvaliableTimeListPage() {
	const navigate = useNavigate();

	const handleNewClick = () => {
		navigate("/avaliableTime/new");
	};

	return (
		<>
			<RegisterButton
				buttonText="Novo horário"
				onNewClick={handleNewClick}
			/>
			<TableAvaliable />
		</>
	);
}
