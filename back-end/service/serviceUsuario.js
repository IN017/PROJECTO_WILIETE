import {prisma} from "../prismaClient/prismaClient.js"
import {hashSenha, compareSenha} from "../bcrypt-jwt/hashSenha.js";

export class ServiceUsuario {

    static async criarUsuario(dados) {

        try {
            const {nome, email, senha, telefone, perfil} = dados;

            if (!nome || !email || !senha || !telefone || !perfil) {
                throw new Error("Todos os campos são obrigatórios.");
            }

            const emailFormatado = email.trim().toLowerCase();

            // Verificar se o email já existe
            const usuariooExistente = await prisma.usuario.findUnique({
                where: { email: emailFormatado }
            });
            if(usuariooExistente) { throw new Error("Email já cadastrado."); }

            // verificar se o telefone já existe
            const telefoneExistente = await prisma.usuario.findUnique({
                where: { telefone: telefone }   
            });
            if(telefoneExistente) { throw new Error("Telefone já cadastrado."); }


            const senhaHash = await hashSenha(senha);

            const usuarioCriado = await prisma.usuario.create({
                data: {
                    nome,
                    email: emailFormatado,
                    senha: senhaHash,
                    telefone,
                    perfil
                }
            });

            return usuarioCriado;

        } catch (error) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }

    // LOGIN   

    //   // LISTAR USUÁRIOS
    static async listarUsuarios() {
        try {
            const usuario = await prisma.usuario.findMany();
            return usuario;
        } catch (error) {
            throw new Error(`Erro ao listar usuários: ${error.message}`);
        }
    }

    // LISTAR USUÁRIO POR ID
    static async listarUsuarioPorId(id) {
        try {   
            const usuario = await prisma.usuario.findUnique({
                where: { id }
            });         
            if (!usuario) {
                throw new Error("Usuário não encontrado.");
            }       
            return usuario;

        } catch (error) {
            throw new Error(`Erro ao listar usuário por ID: ${error.message}`);
        }       

    }

    // ATUALIZAR USUÁRIO
    static async atualizarUsuario(id, dados) {
        try {
            const {nome, email, senha, telefone, perfil} = dados;   
            const usuarioExistente = await prisma.usuario.findUnique({
                where: { id }
            });     
            if (!usuarioExistente) {
                throw new Error("Usuário não encontrado.");
            }       
            const emailFormatado = email.trim().toLowerCase();  
            const usuarioAtualizado = await prisma.usuario.update({
                where: { id },
                data: {
                    nome,       
                    email: emailFormatado,
                    senha,
                    telefone,
                    perfil
                }
            });     
            return usuarioAtualizado;
        } catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error.message}`);
        }               
    }

    // DELETAR USUÁRIO
    static async deletarUsuario(id) {
        try {
            const usuarioExistente = await prisma.usuario.findUnique({
                where: { id }
            });

            if (!usuarioExistente) {
                throw new Error("Usuário não encontrado.");
            }   

            await prisma.usuario.delete({
                where: { id }
            });     
            return { message: "Usuário deletado com sucesso." };
        } catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error.message}`);
        }
    }

}