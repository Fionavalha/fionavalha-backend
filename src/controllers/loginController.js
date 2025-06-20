import { insertLogin } from "../models/loginModel.js"

export async function realizarLogin(req, res){
  const resposta = await insertLogin(req.body)
  res.status(201).json(resposta)
}