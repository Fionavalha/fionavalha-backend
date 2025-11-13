import pool from "../config/database.js";

export async function insertAdicional(req) {
  const sql = "INSERT INTO adicionais (nome_adicional, valor_adicional) VALUES ($1, $2) RETURNING *";
  const values = [req.nome_adicional, req.valor_adicional];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function selectAdicional(id_adicional) {
  const sql = "SELECT * FROM adicionais WHERE id_adicional = $1";
  const values = [id_adicional];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function selectAdicionais() {
  const sql = "SELECT * FROM adicionais ORDER BY valor_adicional DESC;";
  const res = await pool.query(sql);
  return res.rows;
}

export async function updateAdicional(id_adicional, req) {
  const sql = "UPDATE adicionais SET nome_adicional = $1, valor_adicional = $2 WHERE id_adicional = $3 RETURNING *";
  const values = [req.nome_adicional, req.valor_adicional, id_adicional];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function deleteAdicional(id_adicional) {
  const sql = "DELETE FROM adicionais WHERE id_adicional = $1";
  const values = [id_adicional];
  const res = await pool.query(sql, values);
  return res.rows;
}
