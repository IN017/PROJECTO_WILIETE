import { prisma } from "../prismaClient/prismaClient.js";

export class ServiceTurma {

    static async criarTurma(dados) {
        try {
            const { nome, usuarioId } = dados;

            if (!nome || !usuarioId) {
                throw new Error("Nome e usuário são obrigatórios.");
            }

            const novaTurma = await prisma.turma.create({
                data: {
                    nome,
                    usuarioId: Number(usuarioId)
                }
            });

            return novaTurma;

        } catch (error) {
            throw new Error(`Erro ao criar turma: ${error.message}`);
        }
    }

    static async listarTurmas() {
        try {
            return await prisma.turma.findMany();

        } catch (error) {
            throw new Error(`Erro ao listar turmas: ${error.message}`);
        }
    }

    static async obterTurmaPorId(id) {
        try {
            const turma = await prisma.turma.findUnique({
                where: { id: Number(id) },
                include: {
                    usuario: true
                }
            });

            if (!turma) {
                throw new Error("Turma não encontrada.");
            }

            return turma;

        } catch (error) {
            throw new Error(`Erro ao obter turma: ${error.message}`);
        }
    }

    static async atualizarTurma(id, dados) {
        try {
            const { nome, usuarioId } = dados;

            const turmaExistente = await prisma.turma.findUnique({
                where: { id: Number(id) }
            });

            if (!turmaExistente) {
                throw new Error("Turma não encontrada.");
            }

            const turmaAtualizada = await prisma.turma.update({
                where: { id: Number(id) },
                data: {
                    nome,
                    usuarioId: usuarioId ? Number(usuarioId) : turmaExistente.usuarioId
                }
            });

            return turmaAtualizada;

        } catch (error) {
            throw new Error(`Erro ao atualizar turma: ${error.message}`);
        }
    }

    static async deletarTurma(id) {
        try {
            const turmaExistente = await prisma.turma.findUnique({
                where: { id: Number(id) }
            });

            if (!turmaExistente) {
                throw new Error("Turma não encontrada.");
            }

            await prisma.turma.delete({
                where: { id: Number(id) }
            });

            return { mensagem: "Turma deletada com sucesso." };

        } catch (error) {
            throw new Error(`Erro ao deletar turma: ${error.message}`);
        }
    }
}