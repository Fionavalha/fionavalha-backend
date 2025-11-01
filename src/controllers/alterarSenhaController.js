import { insertAlteracaoSenha } from "../models/alterarSenhaModel.js";

export async function alterarSenha(req, res) {
  const resposta = await insertAlteracaoSenha(req.body);
  res.status(resposta.status).json({ mensagem: resposta.mensagem });
}
