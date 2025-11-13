import pool from "../config/database.js";

export async function selectFormasPagamento() {
  const sql = "SELECT * FROM formas_pagamento ORDER BY adicional_forma_pagamento DESC;";
  const res = await pool.query(sql);
  return res.rows;
}
