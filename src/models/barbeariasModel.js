import pool from "../config/database.js";

export async function selectNumeroClientes(id_barbeiro) {
  const sql = "SELECT numero_clientes FROM barbearias WHERE barbeiro_id = $1";
  
  const values = [id_barbeiro];
  const res = await pool.query(sql, values);
  return res.rows[0];
}

export async function updateNumeroClientes(id_barbeiro, req) {
  const sql = "UPDATE barbearias SET numero_clientes = $1 WHERE barbeiro_id = $2 RETURNING numero_clientes";
  const values = [req.numero_clientes, id_barbeiro];
  const res = await pool.query(sql, values);
  return res.rows[0];
}
