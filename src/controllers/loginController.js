import jwt from "jsonwebtoken";
import { insertLogin } from "../models/loginModel.js";

export async function realizarLogin(req, res) {
  try {
    const resultado = await insertLogin(req.body);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    const token = jwt.sign({ nome: resultado.nome }, process.env.SECRET_KEY);

    return res.json({
      mensagem: resultado.mensagem,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro no servidor" });
  }
}
