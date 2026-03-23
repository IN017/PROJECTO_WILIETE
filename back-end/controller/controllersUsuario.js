import { ServiceUsuario } from "../service/serviceUsuario.js";
import { upload } from "../middlewares/upload.js";

export class ControllerUsuarios {

    // CRIAR USUÁRIO
    static criarUsuario = [
        upload.single("imagem"), // campo do formulário para upload
        async (req, res) => {
            try {
                const dados = req.body;

                // validação básica
                if (!dados.nome || !dados.email || !dados.senha || !dados.telefone || !dados.perfil) {
                    return res.status(400).json({ error: "Campos obrigatórios em falta." });
                }

                // se enviou imagem, adiciona ao objeto dados
                if (req.file) {
                    dados.imagem = req.file.filename;
                }

                const usuarioCriado = await ServiceUsuario.criarUsuario(dados);
                return res.status(201).json(usuarioCriado);

            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        }
    ];

    // LISTAR TODOS
    static async listarUsuarios(req, res) {
        try {
            const usuarios = await ServiceUsuario.listarUsuarios();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ error: "Erro interno ao listar usuários." });
        }
    }

    // LISTAR POR ID
    static async listarUsuarioPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await ServiceUsuario.listarUsuarioPorId(id);
            return res.status(200).json(usuario);
        } catch (error) {
            if (error.message.includes("não encontrado")) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno." });
        }
    }

    // ATUALIZAR USUÁRIO
    static atualizarUsuario = [
        upload.single("imagem"),
        async (req, res) => {
            try {
                const { id } = req.params;
                const dados = req.body;

                // se enviou imagem, adiciona ao objeto dados
                if (req.file) {
                    dados.imagem = req.file.filename;
                }

                const usuarioAtualizado = await ServiceUsuario.atualizarUsuario(id, dados);
                return res.status(200).json(usuarioAtualizado);
            } catch (error) {
                if (error.message.includes("não encontrado")) {
                    return res.status(404).json({ error: error.message });
                }
                return res.status(400).json({ error: error.message });
            }
        }
    ];

    // DELETAR USUÁRIO
    static async deletarUsuario(req, res) {
        try {
            const { id } = req.params;
            const resultado = await ServiceUsuario.deletarUsuario(id);
            return res.status(200).json(resultado);
        } catch (error) {
            if (error.message.includes("não encontrado")) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro ao deletar usuário." });
        }
    }
}