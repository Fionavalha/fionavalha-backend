import pool from "../config/database.js";

export async function insertCabelo(req) {
  const sql = "INSERT INTO cabelos (nome_cabelo, valor_cabelo) VALUES ($1, $2) RETURNING *";
  const values = [req.nome_cabelo, req.valor_cabelo];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function selectCabelo(id_cabelo) {
  const sql = "SELECT * FROM cabelos WHERE id_cabelo = $1";
  const values = [id_cabelo];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function selectCabelos() {
  const sql = "SELECT * FROM cabelos ORDER BY valor_cabelo DESC";
  const res = await pool.query(sql);
  return res.rows;
}

export async function updateCabelo(id_cabelo, req) {
  const sql = "UPDATE cabelos SET nome_cabelo = $1, valor_cabelo = $2 WHERE id_cabelo = $3 RETURNING *";
  const values = [req.nome_cabelo, req.valor_cabelo, id_cabelo];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function deleteCabelo(id_cabelo) {
  const sql = "DELETE FROM cabelos WHERE id_cabelo = $1";
  const values = [id_cabelo];
  const res = await pool.query(sql, values);
  return res.rows;
}
