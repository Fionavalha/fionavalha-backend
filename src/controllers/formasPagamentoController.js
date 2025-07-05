import { selectFormasPagamento } from "../models/formasPagamentoModel.js";

export async function listarFormasPagamento(req, res) {
  const resposta = await selectFormasPagamento();
  res.json(resposta);
}
