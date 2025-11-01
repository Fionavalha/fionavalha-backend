import { deleteAdicional, insertAdicional, selectAdicional, selectAdicionais, updateAdicional } from "../models/adicionalModel.js";

export async function adicionarAdicional(req, res) {
  const resposta = await insertAdicional(req.body);
  res.status(201).json(resposta);
}

export async function listarAdicional(req, res) {
  const resposta = await selectAdicional(req.params.id_adicional);
  res.json(resposta);
}

export async function listarAdicionais(req, res) {
  const resposta = await selectAdicionais();
  res.json(resposta);
}

export async function editarAdicional(req, res) {
  const resposta = await updateAdicional(req.params.id_adicional, req.body);
  res.json(resposta);
}

export async function excluirAdicional(req, res) {
  await deleteAdicional(req.params.id_adicional);
  res.json({ mensagem: "Adicional excluído com sucesso" });
}
