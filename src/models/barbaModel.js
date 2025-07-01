import connect from "../config/database.js";

export async function insertBarba(req) {
  const client = await connect();
  const sql = "INSERT INTO barbas (nome_barba, valor_barba) VALUES ($1, $2) RETURNING *";
  const values = [req.nome_barba, req.valor_barba];
  const res = await client.query(sql, values);
  return res.rows;
}

export async function selectBarba(id_barba) {
  const client = await connect();
  const sql = "SELECT * FROM barbas WHERE id_barba = $1";
  const values = [id_barba];
  const res = await client.query(sql, values);
  return res.rows;
}

export async function selectBarbas() {
  const client = await connect();
  const sql = "SELECT * FROM barbas";
  const res = await client.query(sql);
  return res.rows;
}

export async function updateBarba(id_barba, req) {
  const client = await connect();
  const sql = "UPDATE barbas SET nome_barba = $1, valor_barba = $2 WHERE id_barba = $3 RETURNING *";
  const values = [req.nome_barba, req.valor_barba, id_barba];
  const res = await client.query(sql, values);
  return res.rows;
}

export async function deleteBarba(id_barba) {
  const client = await connect();
  const sql = "DELETE FROM barbas WHERE id_barba = $1";
  const values = [id_barba];
  const res = await client.query(sql, values);
  return res.rows;
}
