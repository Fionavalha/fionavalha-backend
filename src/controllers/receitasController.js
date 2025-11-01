import { selectReceitas } from "../models/receitasModel.js";

export async function listarReceitas(req, res) {
  const resposta = await selectReceitas(req.query);
  res.json(resposta);
}
