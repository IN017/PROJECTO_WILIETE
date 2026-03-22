import { ServiceDisciplina } from "../service/serviceDisciplina.js";

export class ControllerDisciplina {
    static async criarDisciplina(req, res) {
        try {
            const { nome, professorId } = req.body;
            const disciplinaCriada = await ServiceDisciplina.criarDisciplina(nome, professorId);
            res.status(201).json(disciplinaCriada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarDisciplinas(req, res) {
        try {
            const disciplinas = await ServiceDisciplina.listarDisciplinas();
            res.status(200).json(disciplinas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async obterDisciplinaPorId(req, res) {
        try {
            const { id } = req.params;
            const disciplina = await ServiceDisciplina.obterDisciplinaPorId(id);
            res.status(200).json(disciplina);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async atualizarDisciplina(req, res) {
        try {
            const { id } = req.params;
            const { nome, professorId } = req.body;
            const disciplinaAtualizada = await ServiceDisciplina.atualizarDisciplina(id, nome, professorId);
            res.status(200).json(disciplinaAtualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deletarDisciplina(req, res) {
        try {
            const { id } = req.params;
            const resultado = await ServiceDisciplina.deletarDisciplina(id);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}