import pool from "../config/database.js";

function formatarDataLocal(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export async function selectReceitas(req) {
  const dataInicial = req.data_inicial;
  const dataFinal = req.data_final;

  const sql = `
    SELECT nome, tipo, COUNT(DISTINCT servico_realizado_id) AS qtd, SUM(valor_item)::NUMERIC(10,2) AS valor_total
    FROM (
      SELECT 
        i.item_id, 
        i.tipo, 
        i.servico_realizado_id,
        i.valor_item,
        CASE 
          WHEN i.tipo='cabelo' THEN c.nome_cabelo
          WHEN i.tipo='barba' THEN b.nome_barba
          WHEN i.tipo='sobrancelha' THEN s.nome_sobrancelha
          WHEN i.tipo='adicional' THEN a.nome_adicional
          ELSE 'Outro'
        END AS nome
      FROM itens_servico_realizado i
      JOIN servicos_realizados sr ON sr.id_servico_realizado = i.servico_realizado_id
      LEFT JOIN cabelos c ON i.tipo='cabelo' AND c.id_cabelo = i.item_id
      LEFT JOIN barbas b ON i.tipo='barba' AND b.id_barba = i.item_id
      LEFT JOIN sobrancelhas s ON i.tipo='sobrancelha' AND s.id_sobrancelha = i.item_id
      LEFT JOIN adicionais a ON i.tipo='adicional' AND a.id_adicional = i.item_id
      WHERE sr.data_servico_realizado::date BETWEEN $1 AND $2
    ) AS t
    GROUP BY nome, tipo
    ORDER BY nome
  `;

  const sqlTotal = `
    SELECT COUNT(DISTINCT servico_realizado_id) AS qtd,
           SUM(valor_item)::NUMERIC(10,2) AS valor_total
    FROM itens_servico_realizado i
    JOIN servicos_realizados sr ON sr.id_servico_realizado = i.servico_realizado_id
    WHERE sr.data_servico_realizado::date BETWEEN $1 AND $2
  `;

  const values = [dataInicial, dataFinal];
  const resCortes = await pool.query(sql, values);
  const resTotal = await pool.query(sqlTotal, values);

  return {
    cortes: resCortes.rows,
    total_geral: resTotal.rows[0],
  };
}