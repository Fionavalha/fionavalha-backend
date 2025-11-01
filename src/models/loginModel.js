import { criptografar } from "../../utils/criptografia.js";
import pool from "../config/database.js";

export async function insertLogin(req) {
  const sql = "SELECT id_barbeiro, nome_barbeiro, senha FROM barbeiros WHERE nome_barbeiro = $1";
  const values = [req.nome_barbeiro];

  const result = await pool.query(sql, values);

  if (result.rows.length === 0) {
    return { erro: "Usuário não encontrado", status: 404 };
  }

  const usuario = result.rows[0];
  const confere = await criptografar("D", req.senha, usuario.senha);

  if (confere) {
    return {
      mensagem: "Login OK",
      id_barbeiro: usuario.id_barbeiro,
      nome_barbeiro: usuario.nome_barbeiro,
    };
  } else {
    return { erro: "Senha incorreta", status: 401 };
  }
}
