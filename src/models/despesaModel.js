import pool from "../config/database.js";

export async function insertDespesa(req) {
  let sql, values;

  if (req.data_despesa && req.data_despesa.trim() !== "") {
    sql = "INSERT INTO despesas (nome_despesa, valor_despesa, data_despesa, fixa) VALUES ($1, $2, $3, $4) RETURNING *";
    values = [req.nome_despesa, req.valor_despesa, req.data_despesa, req.fixa];
  } else {
    sql = "INSERT INTO despesas (nome_despesa, valor_despesa, data_despesa, fixa) VALUES ($1, $2, CURRENT_DATE, $3) RETURNING *";
    values = [req.nome_despesa, req.valor_despesa, req.fixa];
  }

  const res = await pool.query(sql, values);
  return res.rows;
}

export async function selectDespesa(id_despesa) {
  const sql = ` 
  SELECT id_despesa, nome_despesa, valor_despesa, 
    TO_CHAR(data_despesa, 'YYYY-MM-DD') AS data_despesa,fixa
  FROM despesas
  WHERE id_despesa = $1`;
  const values = [id_despesa];
  const res = await pool.query(sql, values);
  return res.rows;
}

export async function selectDespesas(req) {
  let resDespesas, resTotal;

  if (req.data_inicial && req.data_final !== "") {
    const sql = ` 
        SELECT id_despesa, nome_despesa, valor_despesa, 
          TO_CHAR(data_despesa, 'YYYY-MM-DD') AS data_despesa,
          CASE 
            WHEN fixa = false THEN 'N'
            ELSE 'S'
          END AS fixa
        FROM despesas 
        WHERE data_despesa BETWEEN $1 AND $2`;

    const sqlTotalGeral = `
        SELECT
          COUNT(*)::INTEGER AS qtd,
          SUM(valor_despesa)::NUMERIC(10,2) AS valor_total
        FROM despesas
        WHERE data_despesa BETWEEN $1 AND $2`;

    const values = [req.data_inicial, req.data_final];

    resDespesas = await pool.query(sql, values);
    resTotal = await pool.query(sqlTotalGeral, values);
  } else {
    const sql = ` 
      SELECT id_despesa, nome_despesa, valor_despesa, 
        TO_CHAR(data_despesa, 'YYYY-MM-DD') AS data_despesa,
        CASE 
          WHEN fixa = false THEN 'N'
          ELSE 'S'
        END AS fixa
      FROM despesas`;

    const sqlTotalGeral = `
      SELECT
        COUNT(*)::INTEGER AS qtd,
        SUM(valor_despesa)::NUMERIC(10,2) AS valor_total
      FROM despesas`;

    resDespesas = await pool.query(sql);
    resTotal = await pool.query(sqlTotalGeral);
  }
  return {
    despesas: resDespesas.rows,
    total_geral: resTotal.rows[0],
  };
}

export async function updateDespesa(id_despesa, req) {
  let sql, values;

  if (req.data_despesa && req.data_despesa.trim() !== "") {
    sql = "UPDATE despesas SET nome_despesa = $1, valor_despesa = $2, data_despesa = $3, fixa = $4 WHERE id_despesa = $5 RETURNING *";
    values = [req.nome_despesa, req.valor_despesa, req.data_despesa, req.fixa, id_despesa];
  } else {
    sql = "UPDATE despesas SET nome_despesa = $1, valor_despesa = $2, fixa = $3 WHERE id_despesa = $4 RETURNING *";
    values = [req.nome_despesa, req.valor_despesa, req.fixa, id_despesa];
  }

  const res = await pool.query(sql, values);
  return res.rows;
}

export async function deleteDespesa(id_despesa) {
  const sql = "DELETE FROM despesas WHERE id_despesa = $1";
  const values = [id_despesa];
  const res = await pool.query(sql, values);
  return res.rows;
}
