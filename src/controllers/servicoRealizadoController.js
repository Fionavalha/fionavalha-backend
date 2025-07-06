import {
  deleteServicoRealizado,
  insertServicoRealizado,
  selectServicoRealizado,
  selectServicosRealizados,
  updateServicoRealizado,
} from "../models/servicoRealizadoModel.js";

export async function adicionarServicoRealizado(req, res) {
  const resposta = await insertServicoRealizado(req.body);
  res.status(201).json(resposta);
}

export async function listarServicoRealizado(req, res) {
  const resposta = await selectServicoRealizado(req.params.id_servico_realizado);
  res.json(resposta);
}

export async function listarServicosRealizados(req, res) {
  const resposta = await selectServicosRealizados();
  res.json(resposta);
}

export async function editarServicoRealizado(req, res) {
  const resposta = await updateServicoRealizado(req.params.id_servico_realizado, req.body);
  res.json(resposta);
}

export async function excluirServicoRealizado(req, res) {
  await deleteServicoRealizado(req.params.id_servico_realizado);
  res.json({ mensagem: "Serviço excluído com sucesso" });
}
