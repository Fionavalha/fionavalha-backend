import { deleteSobrancelha, insertSobrancelha, selectSobrancelha, selectSobrancelhas, updateSobrancelha } from "../models/sobrancelhaModel.js";

export async function adicionarSobrancelha(req, res) {
  const resposta = await insertSobrancelha(req.body);
  res.status(201).json(resposta);
}

export async function listarSobrancelha(req, res) {
  const resposta = await selectSobrancelha(req.params.id_sobrancelha);
  res.json(resposta);
}

export async function listarSobrancelhas(req, res) {
  const resposta = await selectSobrancelhas();
  res.json(resposta);
}

export async function editarSobrancelha(req, res) {
  const resposta = await updateSobrancelha(req.params.id_sobrancelha, req.body);
  res.json(resposta);
}

export async function excluirSobrancelha(req, res) {
  await deleteSobrancelha(req.params.id_sobrancelha);
  res.json({ mensagem: "Sobrancelha excluída com sucesso" });
}
