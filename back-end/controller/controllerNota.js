import { ServiceNota } from "../service/serviceNota.js";

export class ControllerNota {
    static async criarNota(req, res) {
        try {
            const { titulo, conteudo } = req.body;
            const notaCriada = await ServiceNota.criarNota(titulo, conteudo);
            res.status(201).json(notaCriada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarNotas(req, res) {
        try {
            const notas = await ServiceNota.listarNotas();
            res.status(200).json(notas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async obterNotaPorId(req, res) {
        try {
            const { id } = req.params;
            const nota = await ServiceNota.obterNotaPorId(id);
            res.status(200).json(nota);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async atualizarNota(req, res) {
        try {
            const { id } = req.params;
            const { titulo, conteudo } = req.body;
            const notaAtualizada = await ServiceNota.atualizarNota(id, titulo, conteudo);
            res.status(200).json(notaAtualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deletarNota(req, res) {
        try {
            const { id } = req.params;
            const resultado = await ServiceNota.deletarNota(id);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}