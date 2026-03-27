import RegisterButton from "@/shared/components/RegisterButton";
import { useNavigate } from "react-router-dom";
import TableSchedule from "../../components/TableSchedule";

export default function ScheduleListPage() {
	const navigate = useNavigate();

	const handleNewClick = () => {
		navigate("/schedule/new");
	};

	return (
		<>
			<RegisterButton
				buttonText="Novo agendamento"
				onNewClick={handleNewClick}
			/>
			<TableSchedule />
		</>
	);
}
