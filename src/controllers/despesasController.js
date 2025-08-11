import { deleteDespesa, insertDespesa, selectDespesa, selectDespesas, updateDespesa } from "../models/despesaModel.js";

export async function adicionarDespesa(req, res) {
  const resposta = await insertDespesa(req.body);
  res.status(201).json(resposta);
}

export async function listarDespesa(req, res) {
  const resposta = await selectDespesa(req.params.id_despesa);
  res.json(resposta);
}

export async function listarDespesas(req, res) {
  const resposta = await selectDespesas(req.query);
  res.json(resposta);
}

export async function editarDespesa(req, res) {
  const resposta = await updateDespesa(req.params.id_despesa, req.body);
  res.json(resposta);
}

export async function excluirDespesa(req, res) {
  await deleteDespesa(req.params.id_despesa);
  res.json({ mensagem: "Despesa excluída com sucesso" });
}
