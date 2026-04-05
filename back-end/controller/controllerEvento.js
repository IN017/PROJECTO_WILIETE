import {ServiceEvento} from "../service/serviceEvento.js";

export class ControllerEvento {
   static async criarEvento(req, res) {
    try {
        const eventoCriado = await ServiceEvento.criarEvento(req.body);
        res.status(201).json(eventoCriado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

    static async listarEventos(req, res) {
        try {
            const eventos = await ServiceEvento.listarEventos();
            res.status(200).json(eventos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async obterEventoPorId(req, res) {
        try {
            const { id } = req.params;
            const evento = await ServiceEvento.obterEventoPorId(id);
            res.status(200).json(evento);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async atualizarEvento(req, res) {
    try {
        const { id } = req.params;
        const { titulo, descricao, imagem } = req.body;

        const eventoAtualizado = await ServiceEvento.atualizarEvento(id, {
            titulo,
            descricao,
            imagem
        });

        res.status(200).json(eventoAtualizado);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

    static async deletarEvento(req, res) {
        try {
            const { id } = req.params;
            const resultado = await ServiceEvento.deletarEvento(id);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}