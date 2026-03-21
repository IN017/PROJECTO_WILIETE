import { ServiceReuniao } from "../service/serviceReuniao";

export class ControllerReuniao {
    static async criarReuniao(req, res) {
        try {
            const { titulo, linkMeeting, local } = req.body;
            const reuniaoCriada = await ServiceReuniao.criarReuniao(titulo, linkMeeting, local);
            res.status(201).json(reuniaoCriada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarReunioes(req, res) {
        try {
            const reunioes = await ServiceReuniao.listarReunioes();
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
            const { titulo, linkMeeting, local } = req.body;
            const reuniaoAtualizada = await ServiceReuniao.atualizarReuniao(id, titulo, linkMeeting, local);
            res.status(200).json(reuniaoAtualizada);
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