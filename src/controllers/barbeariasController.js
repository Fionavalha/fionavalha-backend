import { selectNumeroClientes, updateNumeroClientes, selectStatusBarbearia, updateStatusBarbearia } from "../models/barbeariasModel.js";

export async function listarNumeroClientes(req, res) {
  const resposta = await selectNumeroClientes();
  res.json(resposta);
}

export async function editarNumeroClientes(req, res) {
  const resposta = await updateNumeroClientes(req.body);
  res.json(resposta);
}

export async function listarStatusBarbearia(req, res) {
  const resposta = await selectStatusBarbearia();
  res.json(resposta);
}

export async function editarStatusBarbearia(req, res) {
  const resposta = await updateStatusBarbearia(req.body);
  res.json(resposta);
}
