import { ServiceUsuario } from "../service/serviceUsuario.js";
import { upload } from "../middlewares/upload.js";

export class ControllerUsuarios {

    // CRIAR USUÁRIO
    static criarUsuario = [
        upload.single("imagem"),
        async (req, res) => {
            try {
                const dados = req.body;

                const perfilMap = {
                    teacher: "PROFESSOR",
                    parent: "ENCARREGADO"
                };
                dados.perfil = perfilMap[dados.perfil] || dados.perfil;

                if (!dados.nome || !dados.email || !dados.senha || !dados.telefone || !dados.perfil) {
                    return res.status(400).json({ error: "Campos obrigatórios em falta." });
                }

                // Validações condicionais por perfil
                if (dados.perfil === "ENCARREGADO") {
                    if (!dados.numeroMatricula?.trim()) {
                        return res.status(400).json({ error: "Número de matrícula do aluno obrigatório." });
                    }
                    if (!dados.relacaoEducando?.trim()) {
                        return res.status(400).json({ error: "Relação com o educando obrigatória." });
                    }
                }

                if (dados.perfil === "PROFESSOR") {
                    if (!dados.codigoVerificacao?.trim()) {
                        return res.status(400).json({ error: "Código de verificação obrigatório." });
                        
                    }
                   
                }

                // Parse arrays
                if (dados['disciplinas[]']) {
                    dados.disciplinas = Array.isArray(dados['disciplinas[]']) ? dados['disciplinas[]'] : [dados['disciplinas[]']];
                    delete dados['disciplinas[]'];
                }
                if (dados['turmas[]']) {
                    dados.turmas = Array.isArray(dados['turmas[]']) ? dados['turmas[]'] : [dados['turmas[]']];
                    delete dados['turmas[]'];
                }

                dados.imagem = req.file ? req.file.filename : null;

                const usuarioCriado = await ServiceUsuario.criarUsuario(dados);
                return res.status(201).json(usuarioCriado);

            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        }
    ];

    // LOGIN

  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      const resultado = await ServiceUsuario.loginUsuario(email, senha);

      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

    // LISTAR TODOS
    static async listarUsuarios(req, res) {
        try {
            const usuarios = await ServiceUsuario.listarUsuarios();
            return res.status(200).json(usuarios);

        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            return res.status(500).json({ error: error.message });
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

                const perfilMap = {
                    teacher: "PROFESSOR",
                    parent: "ENCARREGADO"
                };
                if (dados.perfil) {
                    dados.perfil = perfilMap[dados.perfil] || dados.perfil;
                }

                // Validações condicionais por perfil (só se os campos forem enviados)
                if (dados.perfil === "ENCARREGADO" && dados.numeroMatricula !== undefined) {
                    if (!dados.numeroMatricula?.trim()) {
                        return res.status(400).json({ error: "Número de matrícula inválido." });
                    }
                }

                if (dados.perfil === "PROFESSOR") {
                    if (dados.codigoVerificacao !== undefined && !dados.codigoVerificacao?.trim()) {
                        return res.status(400).json({ error: "Código de verificação inválido." });
                    }
                   
                }

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