import pool from "../config/database.js";

export async function selectReceitas() {
  const sqlCortes = `
    SELECT
      c.nome_cabelo AS nome,
      COUNT(*)::INTEGER AS qtd,
      SUM(i.valor_item)::NUMERIC(10,2) AS valor_total
    FROM itens_servico_realizado i
    JOIN cabelos c ON c.id_cabelo = i.item_id
    WHERE i.tipo = 'cabelo'
    GROUP BY c.nome_cabelo

    UNION ALL

    SELECT
      b.nome_barba AS nome,
      COUNT(*)::INTEGER AS qtd,
      SUM(i.valor_item)::NUMERIC(10,2) AS valor_total
    FROM itens_servico_realizado i
    JOIN barbas b ON b.id_barba = i.item_id
    WHERE i.tipo = 'barba'
    GROUP BY b.nome_barba

    UNION ALL

    SELECT
      s.nome_sobrancelha AS nome,
      COUNT(*)::INTEGER AS qtd,
      SUM(i.valor_item)::NUMERIC(10,2) AS valor_total
    FROM itens_servico_realizado i
    JOIN sobrancelhas s ON s.id_sobrancelha = i.item_id
    WHERE i.tipo = 'sobrancelha'
    GROUP BY s.nome_sobrancelha

    UNION ALL

    SELECT
      a.nome_adicional AS nome,
      COUNT(*)::INTEGER AS qtd,
      SUM(i.valor_item)::NUMERIC(10,2) AS valor_total
    FROM itens_servico_realizado i
    JOIN adicionais a ON a.id_adicional = i.item_id
    WHERE i.tipo = 'adicional'
    GROUP BY a.nome_adicional

    ORDER BY nome;
  `;

  const sqlTotalGeral = `
    SELECT
      COUNT(*)::INTEGER AS qtd,
      SUM(valor_item)::NUMERIC(10,2) AS valor_total
    FROM itens_servico_realizado;
  `;

  const resCortes = await pool.query(sqlCortes);
  const resTotal = await pool.query(sqlTotalGeral);

  return {
    cortes: resCortes.rows,
    total_geral: resTotal.rows[0],
  };
}
