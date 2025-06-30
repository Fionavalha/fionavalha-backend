import { criptografar } from "../../utils/criptografia.js";
import connect from "../config/database.js";

export async function insertLogin(req) {
  const client = await connect();
  const sql = "SELECT nome_barbeiro, senha FROM barbeiros WHERE nome_barbeiro = $1";
  const values = [req.nome_barbeiro];

  const result = await client.query(sql, values);

  if (result.rows.length === 0) {
    return { erro: "Usuário não encontrado", status: 404 };
  }

  const usuario = result.rows[0];
  const confere = await criptografar("D", req.senha, usuario.senha);

  if (confere) {
    return { mensagem: "Login OK" };
  } else {
    return { erro: "Senha incorreta", status: 401 };
  }
}
