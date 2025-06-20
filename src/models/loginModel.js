import connect from "../config/database.js";

export async function insertLogin(req) {
  const client = await connect();
  const sql = "SELECT nome_barbeiro, senha FROM barbeiros WHERE nome_barbeiro = $1 AND senha = $2";
  const values = [req.nome_barbeiro, req.senha];
  const res = await client.query(sql, values);
  return res.rows;
}