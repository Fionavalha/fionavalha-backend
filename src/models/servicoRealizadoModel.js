import pool from "../config/database.js";

export async function insertServicoRealizado(req) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const insertServicoSql = `
      INSERT INTO servicos_realizados (
        forma_pagamento_id,
        valor_total
      ) VALUES ($1, $2)
      RETURNING id_servico_realizado
    `;
    const valuesServico = [req.forma_pagamento_id, req.valor_total];
    const result = await client.query(insertServicoSql, valuesServico);
    const idServico = result.rows[0].id_servico_realizado;

    const insertItemSql = `
      INSERT INTO itens_servico_realizado (
        servico_realizado_id,
        tipo,
        item_id,
        valor_item
      ) VALUES ($1, $2, $3, $4)
    `;

    for (const item of req.itens) {
      await client.query(insertItemSql, [idServico, item.tipo, item.item_id, item.valor_item]);
    }

    const updateNumeroClientesSql = "UPDATE barbearias SET numero_clientes = GREATEST(numero_clientes - 1, 0) WHERE id_barbearia = 1";
    await client.query(updateNumeroClientesSql);

    await client.query("COMMIT");
    return { id_servico_realizado: idServico };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function updateServicoRealizado(id_servico_realizado, req) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const updateServicoSql = `
      UPDATE servicos_realizados SET
        forma_pagamento_id = $1,
        valor_total = $2
      WHERE id_servico_realizado = $3
    `;

    await client.query(updateServicoSql, [req.forma_pagamento_id, req.valor_total, id_servico_realizado]);

    await client.query("DELETE FROM itens_servico_realizado WHERE servico_realizado_id = $1", [id_servico_realizado]);

    const insertItemSql = `
      INSERT INTO itens_servico_realizado (
        servico_realizado_id,
        tipo,
        item_id,
        valor_item
      ) VALUES ($1, $2, $3, $4)
    `;

    for (const item of req.itens) {
      await client.query(insertItemSql, [id_servico_realizado, item.tipo, item.item_id, item.valor_item]);
    }

    await client.query("COMMIT");
    return { message: "Serviço atualizado com sucesso" };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function selectServicosRealizados(data) {
  let sql, res;
  if (!data) {
    sql = `
      SELECT
        sr.id_servico_realizado,
        STRING_AGG(
          CASE
            WHEN i.tipo = 'cabelo' THEN c.nome_cabelo
            WHEN i.tipo = 'barba' THEN b.nome_barba
            WHEN i.tipo = 'sobrancelha' THEN s.nome_sobrancelha
            WHEN i.tipo = 'adicional' THEN a.nome_adicional
            ELSE 'Outro'
          END,
          ' - ' ORDER BY i.tipo DESC
        ) AS nome_servico,
        TO_CHAR(sr.data_servico_realizado AT TIME ZONE 'America/Cuiaba', 'HH24:MI') AS horario,
        f.nome_pagamento AS forma_pagamento,
        sr.valor_total
      FROM servicos_realizados sr
      JOIN formas_pagamento f ON f.id_forma_pagamento = sr.forma_pagamento_id
      JOIN itens_servico_realizado i ON i.servico_realizado_id = sr.id_servico_realizado
      LEFT JOIN cabelos c ON i.tipo = 'cabelo' AND c.id_cabelo = i.item_id
      LEFT JOIN barbas b ON i.tipo = 'barba' AND b.id_barba = i.item_id
      LEFT JOIN sobrancelhas s ON i.tipo = 'sobrancelha' AND s.id_sobrancelha = i.item_id
      LEFT JOIN adicionais a ON i.tipo = 'adicional' AND a.id_adicional = i.item_id
      GROUP BY sr.id_servico_realizado, sr.data_servico_realizado, f.nome_pagamento, sr.valor_total
      ORDER BY sr.data_servico_realizado DESC;
    `;
    res = await pool.query(sql);
  } else {
    sql = `
      SELECT
        sr.id_servico_realizado,
        STRING_AGG(
          CASE
            WHEN i.tipo = 'cabelo' THEN c.nome_cabelo
            WHEN i.tipo = 'barba' THEN b.nome_barba
            WHEN i.tipo = 'sobrancelha' THEN s.nome_sobrancelha
            WHEN i.tipo = 'adicional' THEN a.nome_adicional
            ELSE 'Outro'
          END,
          ' - ' ORDER BY i.tipo DESC
        ) AS nome_servico,
        TO_CHAR(sr.data_servico_realizado AT TIME ZONE 'America/Cuiaba', 'HH24:MI') AS horario,
        f.nome_pagamento AS forma_pagamento,
        sr.valor_total
      FROM servicos_realizados sr
      JOIN formas_pagamento f ON f.id_forma_pagamento = sr.forma_pagamento_id
      JOIN itens_servico_realizado i ON i.servico_realizado_id = sr.id_servico_realizado
      LEFT JOIN cabelos c ON i.tipo = 'cabelo' AND c.id_cabelo = i.item_id
      LEFT JOIN barbas b ON i.tipo = 'barba' AND b.id_barba = i.item_id
      LEFT JOIN sobrancelhas s ON i.tipo = 'sobrancelha' AND s.id_sobrancelha = i.item_id
      LEFT JOIN adicionais a ON i.tipo = 'adicional' AND a.id_adicional = i.item_id
      WHERE sr.data_servico_realizado >= $1::date
        AND sr.data_servico_realizado < ($1::date + INTERVAL '1 day')
      GROUP BY sr.id_servico_realizado, sr.data_servico_realizado, f.nome_pagamento, sr.valor_total
      ORDER BY sr.data_servico_realizado DESC;
    `;
    res = await pool.query(sql, [data]);
  }
  return res.rows;
}

export async function selectServicoRealizado(id) {
  const sql = `
    SELECT
      sr.id_servico_realizado,
      STRING_AGG(
        CASE
          WHEN i.tipo = 'cabelo' THEN c.nome_cabelo
          WHEN i.tipo = 'barba' THEN b.nome_barba
          WHEN i.tipo = 'sobrancelha' THEN s.nome_sobrancelha
          WHEN i.tipo = 'adicional' THEN a.nome_adicional
          ELSE 'Outro'
        END,
        ' - ' ORDER BY i.tipo DESC
      ) AS nome_servico,
      TO_CHAR(sr.data_servico_realizado AT TIME ZONE 'America/Cuiaba', 'HH24:MI') AS horario,
      f.nome_pagamento AS forma_pagamento,
      sr.valor_total
    FROM servicos_realizados sr
    JOIN formas_pagamento f ON f.id_forma_pagamento = sr.forma_pagamento_id
    JOIN itens_servico_realizado i ON i.servico_realizado_id = sr.id_servico_realizado
    LEFT JOIN cabelos c ON i.tipo = 'cabelo' AND c.id_cabelo = i.item_id
    LEFT JOIN barbas b ON i.tipo = 'barba' AND b.id_barba = i.item_id
    LEFT JOIN sobrancelhas s ON i.tipo = 'sobrancelha' AND s.id_sobrancelha = i.item_id
    LEFT JOIN adicionais a ON i.tipo = 'adicional' AND a.id_adicional = i.item_id
    WHERE sr.id_servico_realizado = $1
    GROUP BY sr.id_servico_realizado, sr.data_servico_realizado, f.nome_pagamento, sr.valor_total
    ORDER BY sr.data_servico_realizado DESC;
  `;
  const res = await pool.query(sql, [id]);
  return res.rows;
}

export async function deleteServicoRealizado(id) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM itens_servico_realizado WHERE servico_realizado_id = $1", [id]);
    await client.query("DELETE FROM servicos_realizados WHERE id_servico_realizado = $1", [id]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function selectItensServicoRealizado(id_servico) {
  const sql = `
    SELECT
      sr.id_servico_realizado,
      sr.forma_pagamento_id, 
      f.nome_pagamento, 
      f.adicional_forma_pagamento,
      sr.valor_total, 
      sr.data_servico_realizado, 
      isr.tipo, 
      isr.valor_item, 
      isr.item_id,
      CASE
        WHEN isr.tipo = 'cabelo' THEN c.nome_cabelo
        WHEN isr.tipo = 'barba' THEN b.nome_barba
        WHEN isr.tipo = 'sobrancelha' THEN s.nome_sobrancelha
        WHEN isr.tipo = 'adicional' THEN a.nome_adicional
        ELSE 'Outro'
      END AS nome_item
    FROM servicos_realizados sr
    INNER JOIN formas_pagamento f 
      ON sr.forma_pagamento_id = f.id_forma_pagamento
    INNER JOIN itens_servico_realizado isr 
      ON sr.id_servico_realizado = isr.servico_realizado_id
    LEFT JOIN cabelos c 
      ON isr.tipo = 'cabelo' AND c.id_cabelo = isr.item_id
    LEFT JOIN barbas b 
      ON isr.tipo = 'barba' AND b.id_barba = isr.item_id
    LEFT JOIN sobrancelhas s 
      ON isr.tipo = 'sobrancelha' AND s.id_sobrancelha = isr.item_id
    LEFT JOIN adicionais a 
      ON isr.tipo = 'adicional' AND a.id_adicional = isr.item_id
    WHERE sr.id_servico_realizado = $1;
  `;
  const res = await pool.query(sql, [id_servico]);
  return res.rows;
}
