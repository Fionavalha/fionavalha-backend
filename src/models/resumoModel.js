import pool from "../config/database.js";

export async function selectAnosComDados() {
  const sql = `
    SELECT DISTINCT ano
    FROM (
      SELECT EXTRACT(YEAR FROM data_servico_realizado)::INT AS ano
      FROM servicos_realizados
      WHERE data_servico_realizado IS NOT NULL
      UNION
      SELECT EXTRACT(YEAR FROM data_despesa)::INT AS ano
      FROM despesas
      WHERE data_despesa IS NOT NULL
    ) anos
    ORDER BY ano ASC
  `;

  const res = await pool.query(sql);
  return res.rows.map((row) => row.ano);
}

export async function selectResumoAnual(req) {
  const ano = Number(req.ano);
  const anoInt = Number.isInteger(ano) ? ano : new Date().getFullYear();

  const sqlReceitas = `
    SELECT TO_CHAR(data_servico_realizado, 'YYYY-MM') AS chave,
           COALESCE(SUM(valor_total), 0)::NUMERIC(10,2) AS valor
    FROM servicos_realizados
    WHERE EXTRACT(YEAR FROM data_servico_realizado) = $1
    GROUP BY chave
  `;

  const sqlDespesas = `
    SELECT TO_CHAR(data_despesa, 'YYYY-MM') AS chave,
           COALESCE(SUM(valor_despesa), 0)::NUMERIC(10,2) AS valor
    FROM despesas
    WHERE EXTRACT(YEAR FROM data_despesa) = $1
    GROUP BY chave
  `;

  const [resReceitas, resDespesas] = await Promise.all([
    pool.query(sqlReceitas, [anoInt]),
    pool.query(sqlDespesas, [anoInt]),
  ]);

  const porMes = Array.from({ length: 12 }, (_, i) => ({
    mes: i,
    receitas: 0,
    despesas: 0,
    saldo: 0,
  }));

  for (const row of resReceitas.rows) {
    const mes = Number(row.chave.split("-")[1]) - 1;
    porMes[mes].receitas = Number(row.valor);
  }

  for (const row of resDespesas.rows) {
    const mes = Number(row.chave.split("-")[1]) - 1;
    porMes[mes].despesas = Number(row.valor);
  }

  for (const item of porMes) {
    item.saldo = Math.round((item.receitas - item.despesas) * 100) / 100;
  }

  return porMes;
}
