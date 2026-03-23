import { ServiceTurma } from "../service/ServiceTurma.js";

export class ControllerTurma {

    static async criarTurma(req, res) {
        try {
            const { nome, usuarioId } = req.body;

            const turmaCriada = await ServiceTurma.criarTurma({
                nome,
                usuarioId
            });

            res.status(201).json(turmaCriada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarTurmas(req, res) {
        try {
            const turmas = await ServiceTurma.listarTurmas();
            res.status(200).json(turmas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async obterTurmaPorId(req, res) {
        try {
            const { id } = req.params;

            const turma = await ServiceTurma.obterTurmaPorId(id);

            res.status(200).json(turma);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async atualizarTurma(req, res) {
        try {
            const { id } = req.params;
            const { nome, usuarioId } = req.body;

            const turmaAtualizada = await ServiceTurma.atualizarTurma(id, {
                nome,
                usuarioId
            });

            res.status(200).json(turmaAtualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deletarTurma(req, res) {
        try {
            const { id } = req.params;

            const resultado = await ServiceTurma.deletarTurma(id);

            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}