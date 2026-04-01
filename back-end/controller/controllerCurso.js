import { ServiceCurso } from "../service/serviceCurso.js";

export class ControllerCurso {

    static async criarCurso(req, res) {
        try {
            const dados = req.body;
            const cursoCriado = await ServiceCurso.criarCurso(dados);
            res.status(201).json(cursoCriado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarCursos(req, res) {
        try {
            const cursos = await ServiceCurso.listarCursos();
            res.status(200).json(cursos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async obterCursoPorId(req, res) {
        try {
            const { id } = req.params;
            const curso = await ServiceCurso.obterCursoPorId(id);
            res.status(200).json(curso);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async atualizarCurso(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;
            const cursoAtualizado = await ServiceCurso.atualizarCurso(id, dados);
            res.status(200).json(cursoAtualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deletarCurso(req, res) {
        try {
            const { id } = req.params;
            await ServiceCurso.deletarCurso(id);
            res.status(200).json({ message: "Curso deletado com sucesso." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarCursosComDisciplinas(req, res) {
        try {
            const cursos = await ServiceCurso.listarCursosComDisciplinas();
            res.status(200).json(cursos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
 }