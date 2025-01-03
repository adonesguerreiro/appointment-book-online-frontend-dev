import { UseFormReset } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormDataCompany } from "../../interface/FormDataCompany";

interface useCompanyCancelProps {
	reset: UseFormReset<FormDataCompany>;
}

export const useCompanyCancel = ({ reset }: useCompanyCancelProps) => {
	const navigate = useNavigate();

	const handleCancel = () => {
		reset();
		navigate("/");
	};

	return { handleCancel };
};
