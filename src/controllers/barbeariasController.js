import {
  selectNumeroClientes,
  updateNumeroClientes,
  selectStatusBarbearia,
  updateStatusBarbearia,
  selectBarbearias,
  selectHorarioBarbearia,
  updateHorarioBarbearia,
  selectAdicionalFormaPagamento,
  updateAdicionalFormaPagamento,
} from "../models/barbeariasModel.js";

import { io } from "../server.js";

export async function listarBarbearias(req, res) {
  const resposta = await selectBarbearias();
  res.json(resposta);
}

export async function listarNumeroClientes(req, res) {
  const resposta = await selectNumeroClientes();
  res.json(resposta);
}

export async function editarNumeroClientes(req, res) {
  const resposta = await updateNumeroClientes(req.body);

  const dadosAtualizados = await selectBarbearias();

  io.emit("barbeariaAtualizada", {
    numero_clientes: dadosAtualizados.numero_clientes,
    status: dadosAtualizados.status,
  });

  res.json(resposta);
}

export async function listarStatusBarbearia(req, res) {
  const resposta = await selectStatusBarbearia();
  res.json(resposta);
}

export async function editarStatusBarbearia(req, res) {
  const resposta = await updateStatusBarbearia(req.body);

  const dadosAtualizados = await selectBarbearias();

  io.emit("barbeariaAtualizada", {
    numero_clientes: dadosAtualizados.numero_clientes,
    status: dadosAtualizados.status,
  });

  res.json(resposta);
}

export async function listarHorarioBarbearia(req, res) {
  const resposta = await selectHorarioBarbearia();
  res.json(resposta);
}

export async function editarHorarioBarbearia(req, res) {
  const resposta = await updateHorarioBarbearia(req.body);
  res.json(resposta);
}

export async function listarAdicionalFormaPagamento(req, res) {
  const resposta = await selectAdicionalFormaPagamento();
  res.json(resposta);
}

export async function editarAdicionalFormaPagamento(req, res) {
  const resposta = await updateAdicionalFormaPagamento(req.body);
  res.json(resposta);
}
