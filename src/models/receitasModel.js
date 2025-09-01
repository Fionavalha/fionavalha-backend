import pool from "../config/database.js";

export async function selectReceitas(req) {
  const sql = `
    SELECT
      c.nome_cabelo AS nome,
      COUNT(*)::INTEGER AS qtd,
      SUM(i.valor_item)::NUMERIC(10,2) AS valor_total
    FROM itens_servico_realizado i
    JOIN cabelos c ON c.id_cabelo = i.item_id
    JOIN servicos_realizados sr ON sr.id_servico_realizado = i.servico_realizado_id
    WHERE i.tipo = 'cabelo'
      AND sr.data_servico_realizado::date BETWEEN $1 AND $2
    GROUP BY c.nome_cabelo

  UNION ALL

    SELECT
      b.nome_barba AS nome,
      COUNT(*)::INTEGER AS qtd,
      SUM(i.valor_item)::NUMERIC(10,2) AS valor_total
    FROM itens_servico_realizado i
    JOIN barbas b ON b.id_barba = i.item_id
    JOIN servicos_realizados sr ON sr.id_servico_realizado = i.servico_realizado_id
    WHERE i.tipo = 'barba'
      AND sr.data_servico_realizado::date BETWEEN $1 AND $2
    GROUP BY b.nome_barba

  UNION ALL

    SELECT
      s.nome_sobrancelha AS nome,
      COUNT(*)::INTEGER AS qtd,
      SUM(i.valor_item)::NUMERIC(10,2) AS valor_total
    FROM itens_servico_realizado i
    JOIN sobrancelhas s ON s.id_sobrancelha = i.item_id
    JOIN servicos_realizados sr ON sr.id_servico_realizado = i.servico_realizado_id
    WHERE i.tipo = 'sobrancelha'
      AND sr.data_servico_realizado::date BETWEEN $1 AND $2
    GROUP BY s.nome_sobrancelha

  UNION ALL

    SELECT
      a.nome_adicional AS nome,
      COUNT(*)::INTEGER AS qtd,
      SUM(i.valor_item)::NUMERIC(10,2) AS valor_total
    FROM itens_servico_realizado i
    JOIN adicionais a ON a.id_adicional = i.item_id
    JOIN servicos_realizados sr ON sr.id_servico_realizado = i.servico_realizado_id
    WHERE i.tipo = 'adicional'
      AND sr.data_servico_realizado::date BETWEEN $1 AND $2
    GROUP BY a.nome_adicional

  ORDER BY nome
  `;

  const sqlTotalGeral = `
    SELECT
      COUNT(*)::INTEGER AS qtd,
      SUM(valor_item)::NUMERIC(10,2) AS valor_total
    FROM itens_servico_realizado i
    JOIN servicos_realizados s 
      ON s.id_servico_realizado = i.servico_realizado_id
    WHERE s.data_servico_realizado::date BETWEEN $1 AND $2;
  `;

  const values = [req.data_inicial, req.data_final];

  const resCortes = await pool.query(sql, values);
  const resTotal = await pool.query(sqlTotalGeral, values);

  return {
    cortes: resCortes.rows,
    total_geral: resTotal.rows[0],
  };
}
