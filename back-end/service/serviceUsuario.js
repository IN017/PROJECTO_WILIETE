import { prisma } from "../prismaClient/prismaClient.js";
import { hashSenha } from "../bcrypt-jwt/hashSenha.js";

export class ServiceUsuario {

    // CRIAR USUÁRIO
    static async criarUsuario(dados) {
    try {
        const { nome, email, senha, telefone, perfil, imagem, disciplinas } = dados;

        if (!nome?.trim() || !email?.trim() || !senha || !telefone || !perfil) {
            throw new Error("Campos obrigatórios em falta.");
        }

        const emailFormatado = email.trim().toLowerCase();

        // Verificar email
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email: emailFormatado }
        });
        if (usuarioExistente) {
            throw new Error("Email já cadastrado.");
        }

        // Verificar telefone
        const telefoneExistente = await prisma.usuario.findUnique({
            where: { telefone }
        });
        if (telefoneExistente) {
            throw new Error("Telefone já cadastrado.");
        }

        // Hash da senha
        const senhaHash = await hashSenha(senha);

        const usuarioCriado = await prisma.usuario.create({
            data: {
                nome,
                email: emailFormatado,
                senha: senhaHash,
                telefone,
                perfil,
                imagem: imagem || null,

                // MANY-TO-MANY
                disciplinas: disciplinas
                    ? {
                        connect: disciplinas.map(id => ({ id }))
                    }
                    : undefined
            },
            include: {
                disciplinas: true
            }
        });

        const { senha: _, ...usuarioSemSenha } = usuarioCriado;
        return usuarioSemSenha;

    } catch (error) {
        throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
}


    // LISTAR USUÁRIOS
   static async listarUsuarios() {
    try {
        const usuarios = await prisma.usuario.findMany({
            include: {
                disciplinas: true,
                turmas: true
            }
        });

        return usuarios.map(({ senha, ...rest }) => rest);

    } catch (error) {
        throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
}



    // LISTAR POR ID
   static async listarUsuarioPorId(id) {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: parseInt(id) },
            include: {
                disciplinas: true,
                turmas: true
            }
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }

        const { senha, ...usuarioSemSenha } = usuario;
        return usuarioSemSenha;

    } catch (error) {
        throw new Error(`Erro ao listar usuário por ID: ${error.message}`);
    }
}
    //ATUALIZAR USUÁRIO
    static async atualizarUsuario(id, dados) {
    try {
        const { nome, email, senha, telefone, perfil, imagem, disciplinas } = dados;

        const usuarioExistente = await prisma.usuario.findUnique({
            where: { id: parseInt(id) }
        });

        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado.");
        }

        let senhaHash = usuarioExistente.senha;
        if (senha) {
            senhaHash = await hashSenha(senha);
        }

        const usuarioAtualizado = await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: {
                nome: nome ?? usuarioExistente.nome,
                email: email ? email.trim().toLowerCase() : usuarioExistente.email,
                senha: senhaHash,
                telefone: telefone ?? usuarioExistente.telefone,
                perfil: perfil ?? usuarioExistente.perfil,
                imagem: imagem ?? usuarioExistente.imagem,

                // MANY-TO-MANY UPDATE
                disciplinas: disciplinas
                    ? {
                        set: disciplinas.map(id => ({ id }))
                    }
                    : undefined
            },
            include: {
                disciplinas: true
            }
        });

        const { senha: _, ...usuarioSemSenha } = usuarioAtualizado;
        return usuarioSemSenha;

    } catch (error) {
        throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
}



    // DELETAR USUÁRIO
   static async deletarUsuario(id) {
    try {
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { id: parseInt(id) }
        });

        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado.");
        }

        await prisma.usuario.delete({
            where: { id: parseInt(id) }
        });

        return { mensagem: "Usuário deletado com sucesso." };

    } catch (error) {
        throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
}
}