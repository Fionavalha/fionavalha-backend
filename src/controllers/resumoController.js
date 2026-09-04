import {
  selectAnosComDados,
  selectResumoAnual,
} from "../models/resumoModel.js";

export async function listarAnosComDados(req, res) {
  const resposta = await selectAnosComDados();
  res.json(resposta);
}

export async function listarResumoAnual(req, res) {
  const resposta = await selectResumoAnual(req.query);
  res.json(resposta);
}
