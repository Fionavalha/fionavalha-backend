import { selectReceitas, selectReceitasFormasPagamento } from "../models/receitasModel.js";

export async function listarReceitas(req, res) {
  const resposta = await selectReceitas(req.query);
  res.json(resposta);
}

export async function listarReceitasFormaPagamento(req, res) {
  const resposta = await selectReceitasFormasPagamento(req.query);
  res.json(resposta);
}
