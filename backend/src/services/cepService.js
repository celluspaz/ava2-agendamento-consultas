import axios from "axios";

export async function lookupCep(cep) {
  const cleaned = (cep || "").replace(/\D/g, "");

  if (!cleaned || cleaned.length !== 8) {
    throw new Error("CEP inválido");
  }

  const url = `https://viacep.com.br/ws/${cleaned}/json/`;
  const resp = await axios.get(url, { timeout: 5000 });

  if (resp.data.erro) {
    throw new Error("CEP não encontrado");
  }

  return {
    cep: resp.data.cep,
    street: resp.data.logradouro,
    neighborhood: resp.data.bairro,
    city: resp.data.localidade,
    state: resp.data.uf,
  };
}
