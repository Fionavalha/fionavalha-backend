import {insertLogin} from "../models/loginModel.js"

export async function realizarLogin(req, res) {
  try {  
    const resultado = await insertLogin(req.body);

    if (resultado.erro) {
      return res.status(resultado.status).json({ erro: resultado.erro });
    }

    res.json({ mensagem: resultado.mensagem });
  } catch (error) {
    res.status(500).json({ erro: 'Erro no servidor' });
  }
}
