import { selectNumeroClientes, updateNumeroClientes } from "../models/barbeariasModel.js";

export async function listarNumeroClientes(req, res) {
  const resposta = await selectNumeroClientes(req.params.id_barbeiro);
  res.json(resposta);
}

export async function editarNumeroClientes(req, res) {
  const resposta = await updateNumeroClientes(req.params.id_barbeiro,req.body);
  res.json(resposta);
}
