import { ServiceAviso } from "../service/serviceAviso";

export class ControllerAviso {
    static async criarAviso(req, res) {
        try {
            const { titulo, descricao, imagem } = req.body;
            const avisoCriado = await ServiceAviso.criarAviso(titulo, descricao, imagem);
            res.status(201).json(avisoCriado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarAvisos(req, res) {
        try {
            const avisos = await ServiceAviso.listarAvisos();
            res.status(200).json(avisos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async obterAvisoPorId(req, res) {
        try {
            const { id } = req.params;
            const aviso = await ServiceAviso.obterAvisoPorId(id);
            res.status(200).json(aviso);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }   
    }

    static async atualizarAviso(req, res) {
        try {
            const { id } = req.params;
            const { titulo, descricao, imagem } = req.body;
            const avisoAtualizado = await ServiceAviso.atualizarAviso(id, titulo, descricao, imagem);
            res.status(200).json(avisoAtualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deletarAviso(req, res) {
        try {
            const { id } = req.params;
            const avisoDeletado = await ServiceAviso.deletarAviso(id);
            res.status(200).json(avisoDeletado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}