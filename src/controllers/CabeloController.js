import { deleteCabelo, insertCabelo, selectCabelo, selectCabelos, updateCabelo } from "../models/cabeloModel.js";

export async function adicionarCabelo(req, res) {
  const resposta = await insertCabelo(req.body);
  res.status(201).json(resposta);
}

export async function listarCabelo(req, res) {
  const resposta = await selectCabelo(req.params.id_cabelo);
  res.json(resposta);
}

export async function listarCabelos(req, res) {
  const resposta = await selectCabelos();
  res.json(resposta);
}

export async function editarCabelo(req, res) {
  const resposta = await updateCabelo(req.params.id_cabelo, req.body);
  res.json(resposta);
}

export async function excluirCabelo(req, res) {
  await deleteCabelo(req.params.id_cabelo);
  res.json({ mensagem: "Cabelo excluído com sucesso" });
}
