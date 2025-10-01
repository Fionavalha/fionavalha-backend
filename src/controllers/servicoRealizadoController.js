import * as ServicoModel from "../models/servicoRealizadoModel.js";

export async function listarServicosRealizados(req, res) {
  try {
    const servicos = await ServicoModel.selectServicosRealizados();
    res.json(servicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function listarServicoRealizado(req, res) {
  try {
    const { id_servico_realizado } = req.params;
    const servico = await ServicoModel.selectServicoRealizado(id_servico_realizado);
    if (!servico.length) return res.status(404).json({ message: "Serviço não encontrado" });
    res.json(servico[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function listarItensServico(req, res) {
  try {
    const { id_servico_realizado } = req.params;
    const itens = await ServicoModel.selectItensServicoRealizado(id_servico_realizado);
    if (!itens.length) return res.status(404).json({ message: "Itens não encontrados" });
    res.json(itens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function adicionarServicoRealizado(req, res) {
  try {
    const novoServico = await ServicoModel.insertServicoRealizado(req.body);
    res.status(201).json(novoServico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function editarServicoRealizado(req, res) {
  try {
    const { id_servico_realizado } = req.params;
    const resultado = await ServicoModel.updateServicoRealizado(id_servico_realizado, req.body);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function excluirServicoRealizado(req, res) {
  try {
    const { id_servico_realizado } = req.params;
    await ServicoModel.deleteServicoRealizado(id_servico_realizado);
    res.json({ message: "Serviço excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
