import jwt from "jsonwebtoken";
import { insertLogin } from "../models/loginModel.js";

export async function realizarLogin(req, res) {
  try {
    const resultado = await insertLogin(req.body);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    const token = jwt.sign({ nome_barbeiro: resultado.nome_barbeiro }, process.env.SECRET_KEY);

    return res.json({
      mensagem: resultado.mensagem,
      token: token,
      id_barbeiro: resultado.id_barbeiro,
      nome_barbeiro: resultado.nome_barbeiro,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro no servidor" });
  }
}
