import pool from "../config/database.js";

export async function selectReceitas(req) {
  const dataInicial = req.data_inicial;
  const dataFinal = req.data_final;
  const values = [dataInicial, dataFinal];

  // Query 1: Busca os ITENS, com valor proporcional
  const sql = `
    WITH servico_item_sum AS (
      -- Passo 1: Calcula o subtotal de 'valor_item' para cada serviço
      SELECT
        servico_realizado_id,
        SUM(valor_item) AS total_itens
      FROM itens_servico_realizado
      GROUP BY servico_realizado_id
    ),
    itens_proporcionais AS (
      -- Passo 2: Calcula o valor proporcional de cada item
      SELECT
        sr.data_servico_realizado,
        i.servico_realizado_id,
        i.tipo,
        i.item_id,
        -- A fórmula: (valor_do_item / subtotal_dos_itens) * valor_total_pago
        -- Isso distribui taxas ou descontos proporcionalmente entre os itens
        (i.valor_item / NULLIF(sis.total_itens, 0)) * sr.valor_total AS valor_proporcional
      FROM itens_servico_realizado i
      JOIN servicos_realizados sr ON i.servico_realizado_id = sr.id_servico_realizado
      JOIN servico_item_sum sis ON i.servico_realizado_id = sis.servico_realizado_id
      -- Filtra pela data aqui
      WHERE sr.data_servico_realizado::date BETWEEN $1 AND $2
    )
    -- Passo 3: Agrupa os itens e soma seus valores proporcionais
    SELECT 
      CASE 
        WHEN ip.tipo='cabelo' THEN c.nome_cabelo
        WHEN ip.tipo='barba' THEN b.nome_barba
        WHEN ip.tipo='sobrancelha' THEN s.nome_sobrancelha
        WHEN ip.tipo='adicional' THEN a.nome_adicional
        ELSE 'Outro'
      END AS nome,
      ip.tipo,
      -- O COUNT(DISTINCT) pode ser enganoso se um serviço tiver dois cortes iguais.
      -- Recomendo COUNT(ip.servico_realizado_id) se você quer contar "vendas"
      COUNT(ip.servico_realizado_id) AS qtd, 
      SUM(ip.valor_proporcional)::NUMERIC(10, 2) AS valor_total
    FROM itens_proporcionais ip
    LEFT JOIN cabelos c ON ip.tipo='cabelo' AND c.id_cabelo = ip.item_id
    LEFT JOIN barbas b ON ip.tipo='barba' AND b.id_barba = ip.item_id
    LEFT JOIN sobrancelhas s ON ip.tipo='sobrancelha' AND s.id_sobrancelha = ip.item_id
    LEFT JOIN adicionais a ON ip.tipo='adicional' AND a.id_adicional = ip.item_id
    GROUP BY nome, ip.tipo
    ORDER BY nome;
  `;

  // Query 2: Busca o TOTAL GERAL (A verdade absoluta do caixa)
  const sqlTotal = `
    SELECT COUNT(id_servico_realizado) AS qtd,
           SUM(valor_total)::NUMERIC(10,2) AS valor_total
    FROM servicos_realizados
    WHERE data_servico_realizado::date BETWEEN $1 AND $2
  `;

  const resCortes = await pool.query(sql, values);
  const resTotal = await pool.query(sqlTotal, values);

  return {
    cortes: resCortes.rows,
    total_geral: resTotal.rows[0],
  };
}
