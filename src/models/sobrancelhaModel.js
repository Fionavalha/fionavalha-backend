import pool from "../config/database.js";

export async function insertSobrancelha(req) {
  const sql = "INSERT INTO sobrancelhas (nome_sobrancelha, valor_sobrancelha) VALUES ($1, $2) RETURNING *";
  const values = [req.nome_sobrancelha, req.valor_sobrancelha];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function selectSobrancelha(id_sobrancelha) {
  const sql = "SELECT * FROM sobrancelhas WHERE id_sobrancelha = $1";
  const values = [id_sobrancelha];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function selectSobrancelhas() {
  const sql = "SELECT * FROM sobrancelhas ORDER BY valor_sobrancelha DESC;";
  const res = await pool.query(sql);
  return res.rows;
}

export async function updateSobrancelha(id_sobrancelha, req) {
  const sql = "UPDATE sobrancelhas SET nome_sobrancelha = $1, valor_sobrancelha = $2 WHERE id_sobrancelha = $3 RETURNING *";
  const values = [req.nome_sobrancelha, req.valor_sobrancelha, id_sobrancelha];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function deleteSobrancelha(id_sobrancelha) {
  const sql = "DELETE FROM sobrancelhas WHERE id_sobrancelha = $1";
  const values = [id_sobrancelha];
  const res = await pool.query(sql, values);
  return res.rows;
}
