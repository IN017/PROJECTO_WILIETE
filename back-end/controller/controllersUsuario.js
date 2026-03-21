import {ServiceUsuario} from "../service/serviceUsuario.js";

export class ControllerUsuarios {

    static async criarUsuario(req, res) {
        try {
            const dados = req.body;
            const usuarioCriado = await ServiceUsuario.criarUsuario(dados);
            res.status(201).json(usuarioCriado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarUsuarios(req, res) {
        try {
            const usuarios = await ServiceUsuario.listarUsuarios();    
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async listarUsuarioPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await ServiceUsuario.listarUsuarioPorId(id);
            res.status(200).json(usuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async atualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;
            const usuarioAtualizado = await ServiceUsuario.atualizarUsuario(id, dados);
            res.status(200).json(usuarioAtualizado);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deletarUsuario(req, res) {
        try {
            const { id } = req.params;
            const resultado = await ServiceUsuario.deletarUsuario(id);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}
