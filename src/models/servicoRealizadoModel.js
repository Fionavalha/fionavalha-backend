import pool from "../config/database.js";

export async function insertServicoRealizado(req) {
  const sql =
    "INSERT INTO servicos_realizados(" +
    "cabelo_id, " +
    "barba_id, " +
    "sobrancelha_id, " +
    "adicional_id, " +
    "forma_pagamento_id, " +
    "valor_servico_realizado, " +
    "data_servico_realizado) " +
    "VALUES ($1,$2,$3,$4,$5,$6,current_timestamp) " +
    "RETURNING *";
  const values = [req.cabelo_id, req.barba_id, req.sobrancelha_id, req.adicional_id, req.forma_pagamento_id, req.valor_servico_realizado];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function selectServicoRealizado(id_servico_realizado) {
  const sql =
    "SELECT " +
    "sr.id_servico_realizado, " +
    "c.nome_cabelo, " +
    "b.nome_barba, " +
    "s.nome_sobrancelha, " +
    "a.nome_adicional, " +
    "fp.nome_pagamento, " +
    "sr.valor_servico_realizado, " +
    "sr.data_servico_realizado " +
    "FROM servicos_realizados sr " +
    "LEFT JOIN cabelos c ON sr.cabelo_id = c.id_cabelo " +
    "LEFT JOIN barbas b ON sr.barba_id = b.id_barba " +
    "LEFT JOIN sobrancelhas s ON sr.sobrancelha_id = s.id_sobrancelha " +
    "LEFT JOIN adicionais a ON sr.adicional_id = a.id_adicional " +
    "LEFT JOIN formas_pagamento fp ON sr.forma_pagamento_id = fp.id_forma_pagamento " +
    "WHERE sr.id_servico_realizado = $1";
  const values = [id_servico_realizado];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function selectServicosRealizados() {
  const sql =
    "SELECT " +
    "sr.id_servico_realizado, " +
    "c.nome_cabelo, " +
    "b.nome_barba, " +
    "s.nome_sobrancelha, " +
    "a.nome_adicional, " +
    "fp.nome_pagamento, " +
    "sr.valor_servico_realizado, " +
    "sr.data_servico_realizado " +
    "FROM servicos_realizados sr " +
    "LEFT JOIN cabelos c ON sr.cabelo_id = c.id_cabelo " +
    "LEFT JOIN barbas b ON sr.barba_id = b.id_barba " +
    "LEFT JOIN sobrancelhas s ON sr.sobrancelha_id = s.id_sobrancelha " +
    "LEFT JOIN adicionais a ON sr.adicional_id = a.id_adicional " +
    "LEFT JOIN formas_pagamento fp ON sr.forma_pagamento_id = fp.id_forma_pagamento " +
    "ORDER BY sr.data_servico_realizado"
  const res = await pool.query(sql);
  return res.rows;
}

export async function updateServicoRealizado(id_servico_realizado, req) {
  const sql =
    "UPDATE servicos_realizados SET " +
    "cabelo_id = $1, " +
    "barba_id = $2, " +
    "sobrancelha_id = $3, " +
    "adicional_id = $4, " +
    "forma_pagamento_id = $5, " +
    "valor_servico_realizado = $6 " +
    "WHERE id_servico_realizado = $7 " +
    "RETURNING *";
  const values = [req.cabelo_id, req.barba_id, req.sobrancelha_id, req.adicional_id, req.forma_pagamento_id, req.valor_servico_realizado, id_servico_realizado];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function deleteServicoRealizado(id_servico_realizado) {
  const sql = "DELETE FROM servicos_realizados WHERE id_servico_realizado = $1";
  const values = [id_servico_realizado];
  const res = await pool.query(sql, values);
  return res.rows;
}
