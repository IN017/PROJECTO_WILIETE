import { ServiceAluno } from "../service/serviceAluno.js";

export class ControllerAluno {

    static async criarAluno(req, res) {
        try {
            const dados = req.body;
            const alunoCriado = await ServiceAluno.criarAluno(dados);
            res.status(201).json(alunoCriado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarAlunos(req, res) {
        try {
            const alunos = await ServiceAluno.listarAlunos();   
            res.status(200).json(alunos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }   

    }

    static async obterAlunoPorId(req, res) {
        try {
            const { id } = req.params;
            const aluno = await ServiceAluno.obterAlunoPorId(id);
            res.status(200).json(aluno);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async atualizarAluno(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;
            const alunoAtualizado = await ServiceAluno.atualizarAluno(id, dados);
            res.status(200).json(alunoAtualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

        }

    static async deletarAluno(req, res) {
        try {
            const { id } = req.params;
            const resultado = await ServiceAluno.deletarAluno(id);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }

}



