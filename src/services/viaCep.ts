import axios from "axios";

export const viaCep = async (cep: string) => {
	try {
		const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`);

		if (data.erro) {
			return "CEP inválido";
		}

		return data;
	} catch (e) {
		console.error("Erro ao buscar o CEP:", e);
		return false;
	}
};
