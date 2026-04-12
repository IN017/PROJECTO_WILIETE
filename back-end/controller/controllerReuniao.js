import { ServiceReuniao } from "../service/serviceReuniao.js";

export class ControllerReuniao {
    static async criarReuniao(req, res) {
        try {
            const { titulo, linkMeeting, local, participantesIds } = req.body;
            // Admin não tem ID, então usa null ou um valor especial
            const criadoPorId = req.user?.id || (req.user?.perfil === "ADMIN" ? null : null);
            const reuniaoCriada = await ServiceReuniao.criarReuniao(titulo, linkMeeting, local, participantesIds, criadoPorId);
            res.status(201).json(reuniaoCriada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarReunioes(req, res) {
        try {
            const { usuarioId } = req.query;
            const reunioes = await ServiceReuniao.listarReunioes(usuarioId);
            res.status(200).json(reunioes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async obterReuniaoPorId(req, res) {
        try {
            const { id } = req.params;
            const reuniao = await ServiceReuniao.obterReuniaoPorId(id);
            res.status(200).json(reuniao);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async atualizarReuniao(req, res) {
        try {
            const { id } = req.params;
            const { titulo, linkMeeting, local, participantesIds } = req.body;
            const reuniaoAtualizada = await ServiceReuniao.atualizarReuniao(id, titulo, linkMeeting, local, participantesIds);
            const reuniaoComDetalhes = await ServiceReuniao.obterReuniaoPorId(id);
            res.status(200).json(reuniaoComDetalhes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deletarReuniao(req, res) {
        try {
            const { id } = req.params;
            const resultado = await ServiceReuniao.deletarReuniao(id);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

 }