import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceAviso {
    async criarAviso(dados) {
        try {
            const { titulo, descricao, imagem } = dados;
            if (!titulo || !descricao || !imagem) {
                throw new Error("Todos os campos são obrigatórios.");
            }
            const novoAviso = await prisma.aviso.create({
                data: {
                    titulo,
                    descricao,
                    usuarioId: imagem
                }
            });
            return novoAviso;
        } catch (error) {
            throw new Error(`Erro ao criar aviso: ${error.message}`);
        }
    }

    async listarAvisos() {
        try {
            const avisos = await prisma.aviso.findMany();
            return avisos;
        } catch (error) {
            throw new Error(`Erro ao listar avisos: ${error.message}`);
        }
    }

    async obterAvisoPorId(id) {
        try {
            const aviso = await prisma.aviso.findUnique({
                where: { id: parseInt(id) }
            });
            if (!aviso) {
                throw new Error("Aviso não encontrado.");
            }
            return aviso;
        } catch (error) {
            throw new Error(`Erro ao obter aviso: ${error.message}`);
        }
    }

    async atualizarAviso(id, titulo, descricao) {
        try {
            if (!titulo || !descricao) {
                throw new Error("O título e a descrição do aviso são obrigatórios.");
            }
            const avisoExistente = await prisma.aviso.findUnique({
                where: { id: parseInt(id) }
            });
            if (!avisoExistente) {
                throw new Error("Aviso não encontrado.");
            }
            const avisoAtualizado = await prisma.aviso.update({
                where: { id: parseInt(id) },
                data: { titulo, descricao }
            });
            return avisoAtualizado;
        } catch (error) {
            throw new Error(`Erro ao atualizar aviso: ${error.message}`);
        }
    }

    async deletarAviso(id) {
        try {
            const avisoExistente = await prisma.aviso.findUnique({
                where: { id: parseInt(id) }
            });
            if (!avisoExistente) {
                throw new Error("Aviso não encontrado.");
            }
            const avisoDeletado = await prisma.aviso.delete({
                where: { id: parseInt(id) }
            });
            return avisoDeletado;
        } catch (error) {
            throw new Error(`Erro ao deletar aviso: ${error.message}`);
        }
    }
}