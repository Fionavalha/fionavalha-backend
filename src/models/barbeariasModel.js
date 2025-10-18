import pool from "../config/database.js";

export async function selectBarbearias() {
  const sql = `
  SELECT numero_clientes, status, 
    TO_CHAR(horario_inicio, 'HH24:00') AS horario_inicio,
    TO_CHAR(horario_fim, 'HH24:00') AS horario_fim
  FROM barbearias
    WHERE barbeiro_id = 1`;
  const res = await pool.query(sql);
  return res.rows[0];
}

export async function selectNumeroClientes() {
  const sql = "SELECT numero_clientes FROM barbearias WHERE barbeiro_id = 1";
  const res = await pool.query(sql);
  return res.rows[0];
}

export async function updateNumeroClientes(req) {
  const sql = "UPDATE barbearias SET numero_clientes = $1 WHERE barbeiro_id = 1 RETURNING numero_clientes";
  const values = [req.numero_clientes];
  const res = await pool.query(sql, values);
  return res.rows[0];
}

export async function selectStatusBarbearia() {
  const sql = "SELECT status FROM barbearias WHERE barbeiro_id = 1";
  const res = await pool.query(sql);
  return res.rows[0];
}

export async function updateStatusBarbearia(req) {
  const sql = "UPDATE barbearias SET status = $1 WHERE barbeiro_id = 1 RETURNING status";
  const values = [req.status];
  const res = await pool.query(sql, values);
  return res.rows[0];
}
