import { deleteBarba, insertBarba, selectBarba, selectBarbas, updateBarba } from "../models/barbaModel.js";

export async function adicionarBarba(req, res) {
  const resposta = await insertBarba(req.body);
  res.status(201).json(resposta);
}

export async function listarBarba(req, res) {
  const resposta = await selectBarba(req.params.id_barba);
  res.json(resposta);
}

export async function listarBarbas(req, res) {
  const resposta = await selectBarbas();
  res.json(resposta);
}

export async function editarBarba(req, res) {
  const resposta = await updateBarba(req.params.id_barba, req.body);
  res.json(resposta);
}

export async function excluirBarba(req, res) {
  await deleteBarba(req.params.id_barba);
  res.json({ mensagem: "Barba excluída com sucesso" });
}
