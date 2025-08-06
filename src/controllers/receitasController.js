import { selectReceitas } from "../models/receitasModel.js";

export async function listarReceitas(req, res) {
  const resposta = await selectReceitas();
  res.json(resposta);
}
