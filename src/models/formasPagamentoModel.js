import pool from "../config/database.js";

export async function selectFormasPagamento() {
  const sql = "SELECT * FROM formas_pagamento";
  const res = await pool.query(sql);
  return res.rows;
}
