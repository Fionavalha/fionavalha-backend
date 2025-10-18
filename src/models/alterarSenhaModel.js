import { criptografar } from "../../utils/criptografia.js";
import pool from "../config/database.js";

export async function insertAlteracaoSenha(req) {
  let sql = "SELECT senha FROM barbeiros WHERE id_barbeiro = 1";
  const result = await pool.query(sql);

  if (result.rows.length === 0) {
    return { mensagem: "Usuário não encontrado", status: 404 };
  }

  const usuario = result.rows[0];

  const confere = await criptografar("D", req.senha_antiga, usuario.senha);

  if (!confere) {
    return { mensagem: "Senha incorreta", status: 400 };
  }

  if (req.senha_antiga === req.senha_nova) {
    return { mensagem: "Senha nova não pode ser igual a antiga", status: 400 };
  }

  try {
    const senhaNova = await criptografar("C", req.senha_nova);

    sql = "UPDATE barbeiros SET senha = $1 WHERE id_barbeiro = $2";
    values = [senhaNova, id_barbeiro];

    await pool.query(sql, values);

    return { mensagem: "Senha alterada com sucesso!", status: 200 };
  } catch (error) {
    return { mensagem: "Erro interno do servidor ao salvar senha", status: 500 };
  }
}
