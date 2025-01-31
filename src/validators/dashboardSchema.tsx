import * as yup from "yup";

export const dashboardSchema = yup.object().shape({
	month: yup.string().required("Mês é obrigatório"),
	year: yup.string().required("Ano é obrigatório"),
});
